import base64
import hashlib
import json
import os
from pathlib import Path
import httpx
import anthropic
import re
import openai
from fastapi import HTTPException
from dotenv import load_dotenv
from pathlib import Path
import logging
import time
from app.config import Config

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)

# Load environment variables
current_file_path = Path(__file__)
env_path = current_file_path.parent.parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

# Get API keys with proper error handling
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not ANTHROPIC_API_KEY:
    logger.error("ANTHROPIC_API_KEY environment variable is not set")
    raise ValueError("ANTHROPIC_API_KEY environment variable is not set")
if not OPENAI_API_KEY:
    logger.error("OPENAI_API_KEY environment variable is not set")
    raise ValueError("OPENAI_API_KEY environment variable is not set")

# Add this simple cache class at the top of your file
class SimpleCache:
    def __init__(self, cache_dir="cache", max_age_days=7):
        self.cache_dir = Path(cache_dir)
        self.max_age_seconds = max_age_days * 24 * 60 * 60
        
        # Create cache directory if it doesn't exist
        self.cache_dir.mkdir(exist_ok=True, parents=True)
        
        # Clean old cache entries on initialization
        self._clean_old_entries()
    
    def _generate_key(self, emotion, image_data):
        """Generate a unique cache key based on emotion and image data"""
        # Hash the image data and emotion to create a unique key
        image_hash = hashlib.md5(image_data).hexdigest()
        emotion_hash = hashlib.md5(emotion.encode()).hexdigest()
        return f"{image_hash}_{emotion_hash}"
    
    def _clean_old_entries(self):
        """Remove cache entries older than max_age_days"""
        current_time = time.time()
        for cache_file in self.cache_dir.glob("*.json"):
            # Check file age
            file_age = current_time - cache_file.stat().st_mtime
            if file_age > self.max_age_seconds:
                try:
                    cache_file.unlink()
                except Exception:
                    pass  # Ignore errors when cleaning cache
    
    def get(self, emotion, image_data):
        """Get cached result if it exists"""
        key = self._generate_key(emotion, image_data)
        cache_file = self.cache_dir / f"{key}.json"
        
        if cache_file.exists():
            try:
                with open(cache_file, "r") as f:
                    data = json.load(f)
                    # Check if the cache entry has expired
                    if time.time() - data.get("timestamp", 0) <= self.max_age_seconds:
                        return data.get("image_url")
            except Exception:
                pass  # If reading fails, just proceed as if no cache exists
        
        return None
    
    def set(self, emotion, image_data, image_url):
        """Cache the result"""
        key = self._generate_key(emotion, image_data)
        cache_file = self.cache_dir / f"{key}.json"
        
        try:
            with open(cache_file, "w") as f:
                json.dump({
                    "image_url": image_url,
                    "timestamp": time.time()
                }, f)
        except Exception as e:
            print(f"Cache write error: {str(e)}")  # Log but don't fail if caching fails

# Create a cache instance
image_cache = SimpleCache()

async def edit_image(emotion: str, image: bytes, image_type: str):
    """
    Process an image to evoke a specific emotion using Claude and DALL-E.
    
    Args:
        emotion: The emotion to evoke in the image
        image: The image bytes
        image_type: The type of image (jpeg, png, etc.)
        
    Returns:
        URL of the generated image
        
    Raises:
        HTTPException: For any errors during processing
    """
    logger.info(f"Processing image with emotion: {emotion}")
    
    try:
        # Check cache first
        cached_url = image_cache.get(emotion, image)
        if cached_url:
            return cached_url
        
        # If not in cache, proceed with normal processing
        image_data = base64.standard_b64encode(image).decode("utf-8")
        anthropic_client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
        openai_client = openai.OpenAI(api_key=OPENAI_API_KEY)
        
        # Prepare the prompt for image description
        prompt1 = f"""
You are an AI assistant tasked with providing detailed and vivid descriptions of images. Your goal is to create a rich, immersive description that allows the reader to visualize the scene as clearly as possible.

You will be presented with an image. Analyze it carefully and thoroughly before crafting your description.

When describing the image, focus on the following key aspects:
1. Overall scene and setting
2. Specific objects, people, or elements present
3. Colors, lighting, and atmosphere
4. Perspective and composition
5. Any notable actions or movements
6. Style or theme of the image (if applicable)

Follow these guidelines to craft your description:
1. Be specific and detailed, using precise language to describe the scene.
2. Establish the mood and atmosphere using descriptive words.
3. Use vivid and descriptive adjectives to enhance clarity and immersion.
4. Consider the perspective and composition of the image.
5. Specify the lighting and time of day if relevant.
6. Incorporate action or movement if present in the image.
7. Focus on the most impactful elements to keep the description clear and concise.
8. Use analogies or comparisons to clarify unfamiliar elements if necessary.
9. Define the style or theme of the scene if applicable.

Structure your response as follows:
1. Begin with a brief overview of the entire scene (1-2 sentences).
2. Then, provide a detailed description, incorporating the guidelines above (3-5 paragraphs).
3. Conclude with a sentence that captures the overall impression or mood of the image.

Write your entire description inside <description> tags. Ensure your description is vivid, engaging, and allows the reader to clearly visualize the scene presented in the image.
        """
        
        # First Claude call to get image description
        logger.info("Getting image description from Claude")
        try:
            message = anthropic_client.messages.create(
                model=Config.CLAUDE_MODEL,
                max_tokens=1024,
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "image",
                                "source": {
                                    "type": "base64",
                                    "media_type": f"image/{image_type}",
                                    "data": image_data,
                                },
                            },
                            {
                                "type": "text",
                                "text": prompt1
                            }
                        ],
                    }
                ],
            )
        except anthropic.APIError as e:
            logger.error(f"Claude API error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Claude API error: {str(e)}")
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

        # Parse the scene description
        try:
            SCENE_DESCRIPTION = parse_message(message, "description")
            logger.info("Successfully parsed scene description")
        except HTTPException as e:
            logger.error(f"Error parsing scene description: {e.detail}")
            raise
        
        # Prepare for the second Claude call
        EMOTION = emotion
        logger.info("Scene description:")
        logger.info(SCENE_DESCRIPTION)
        logger.info("Emotion:")
        logger.info(EMOTION)
        # Second Claude call to enhance the prompt
        logger.info("Enhancing prompt with Claude")
        try:
            message = anthropic_client.messages.create(
                model=Config.CLAUDE_MODEL,
                max_tokens=20000,
                temperature=0.8,
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": f"You are tasked with designing a prompt for Dall-E 3 that enhances a given scene description to evoke a specific emotion more strongly. Your goal is to create a detailed, vivid prompt that follows the provided guidelines while staying under 1000 characters.\n\nFirst, carefully read the following scene description:\n\n<scene_description>\n{SCENE_DESCRIPTION}\n</scene_description>\n\nNow, consider the emotion that needs to be emphasized in this scene:\n\n<target_emotion>\n{EMOTION}\n</target_emotion>\n\nTo enhance the scene description and make it evoke the target emotion more strongly, follow these steps:\n\n1. Analyze the original scene and identify elements that can be modified or added to emphasize the target emotion.\n2. Use specific and detailed language, incorporating vivid adjectives and sensory details.\n3. Describe the mood and atmosphere that aligns with the target emotion.\n4. Consider the perspective, composition, and framing that best conveys the emotion.\n5. Specify lighting, time of day, and weather conditions that reinforce the emotional impact.\n6. Incorporate actions or movements that express the desired emotion.\n7. If appropriate, use analogies or comparisons to well-known styles or themes that align with the emotion.\n8. Balance descriptiveness with conciseness to stay within the character limit.\n\nNow, create your enhanced prompt for Dall-E 3. Your response should be structured as follows:\n\n<enhanced_prompt>\n[Your detailed, emotion-enhancing prompt goes here. Ensure it's under 1000 characters.]\n</enhanced_prompt>\n\n<explanation>\n[Briefly explain how your enhancements emphasize the target emotion and adhere to the provided guidelines.]\n</explanation>\n\nRemember to craft your prompt carefully, ensuring it vividly evokes the target emotion while adhering to the guidelines and character limit."
                            }
                        ]
                    }
                ]
            )
        except anthropic.APIError as e:
            logger.error(f"Claude API error during prompt enhancement: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Claude API error during prompt enhancement: {str(e)}")
        except Exception as e:
            logger.error(f"Unexpected error during prompt enhancement: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Unexpected error during prompt enhancement: {str(e)}")
        
        # Parse the enhanced prompt
        try:
            enhanced_prompt = parse_message(message, "enhanced_prompt")
            logger.info("Successfully parsed enhanced prompt")
            # Log the full prompt for debugging
            logger.info("===== FULL PROMPT BEING SENT TO DALL-E =====")
            logger.info(enhanced_prompt)
            logger.info("============================================")
            
            # Validate the enhanced prompt
            if len(enhanced_prompt) > 1000:
                logger.warning(f"Enhanced prompt exceeds 1000 characters ({len(enhanced_prompt)} chars)")
        except HTTPException as e:
            logger.error(f"Error parsing enhanced prompt: {e.detail}")
            raise
        
        # OpenAI call to generate the image
        logger.info("Generating image with DALL-E")
        try:
            # Log the API call details
            logger.info(f"Calling OpenAI API with model: {Config.DALLE_MODEL}")
            
            response = openai_client.images.generate(
                model=Config.DALLE_MODEL,
                prompt=enhanced_prompt,
                size="1024x1024",
                quality="standard",
                n=1,
            )
        except openai.APIError as e:
            logger.error(f"OpenAI API error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")
        except Exception as e:
            logger.error(f"Unexpected error during image generation: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Unexpected error during image generation: {str(e)}")
        
        # Extract and return the image URL
        try:
            if not response.data or len(response.data) == 0:
                logger.error("OpenAI returned empty response data")
                raise HTTPException(status_code=500, detail="OpenAI returned empty response data")
            
            image_url = response.data[0].url
            if not image_url:
                logger.error("OpenAI response missing image URL")
                raise HTTPException(status_code=500, detail="OpenAI response missing image URL")
            
            logger.info("Successfully generated image")
            
            # Before returning, store in cache
            image_cache.set(emotion, image, image_url)
            return image_url
        except AttributeError as e:
            logger.error(f"Error extracting URL from OpenAI response: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error extracting URL from OpenAI response: {str(e)}")
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        # Catch-all for any other unexpected errors
        logger.error(f"Unexpected error in edit_image: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Unexpected error in image processing: {str(e)}")

def parse_message(message, tag: str):
    """
    Parse the response from Claude to extract content within specified tags.
    
    Args:
        message: The message object from Claude
        tag: The tag to extract content from (e.g., "description", "enhanced_prompt")
        
    Returns:
        The extracted content as a string
        
    Raises:
        HTTPException: If parsing fails or content is empty
    """
    try:
        full_response = ""
        
        # Extract text content from the message
        if message and hasattr(message, 'content') and message.content:
            for block in message.content:
                if block.type == "text":
                    full_response += block.text
        
        if not full_response:
            logger.error("Empty response from Claude")
            raise HTTPException(status_code=500, detail="Empty response from Claude")
        
        # Try to extract content within the specified tags
        tag_match = re.search(r'<{0}>(.*?)</{0}>'.format(tag), full_response, re.DOTALL)
        
        if tag_match:
            output = tag_match.group(1).strip()
            if not output:
                logger.error(f"Empty content within {tag} tags")
                raise HTTPException(status_code=500, detail=f"Empty content within {tag} tags")
            return output
        else:
            # If tags aren't found, log this but return the full response as fallback
            logger.warning(f"Could not find {tag} tags in Claude response. Using full response.")
            return full_response.strip()
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        logger.error(f"Error parsing message for tag {tag}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error parsing message: {str(e)}")