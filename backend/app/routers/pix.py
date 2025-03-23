from fastapi import APIRouter, File, UploadFile, Form, Depends, HTTPException, Request
from pydantic import BaseModel
from typing import Optional, Dict, List
import imghdr
from app.services.pix_serv import edit_image 
from app.config import Config
from PIL import Image
import io
import os
import logging
import time

# Configure logging
logger = logging.getLogger(__name__)

router = APIRouter()

# Define valid emotions for validation
VALID_EMOTIONS = ["Joy", "Sadness", "Anger", "Fear", "Disgust"]

# Simple in-memory rate limiter
class RateLimiter:
    def __init__(self, limit_per_minute: int = 1):
        self.limit = limit_per_minute
        self.requests: Dict[str, List[float]] = {}
    
    def check(self, client_ip: str) -> bool:
        current_time = time.time()
        
        # Initialize if this is a new client
        if client_ip not in self.requests:
            self.requests[client_ip] = []
        
        # Remove requests older than 1 minute
        self.requests[client_ip] = [
            timestamp for timestamp in self.requests[client_ip]
            if current_time - timestamp < 60
        ]
        
        # Check if limit exceeded
        if len(self.requests[client_ip]) >= self.limit:
            return False
        
        # Add current request
        self.requests[client_ip].append(current_time)
        return True

# Create rate limiter instance
rate_limiter = RateLimiter(Config.RATE_LIMIT_PER_MINUTE)

# Add OPTIONS handler for CORS preflight requests
@router.options("/pix")
async def options_pix():
    return {}

@router.post("/pix")
async def pix(request: Request, emotion: str = Form(...), image: UploadFile = File(...)):
    """
    Process an image to evoke a specific emotion.
    
    Args:
        emotion: The emotion to evoke in the image
        image: The uploaded image file
        
    Returns:
        A dictionary containing the URL of the generated image
        
    Raises:
        HTTPException: For validation errors or processing failures
    """
    # Add this after receiving the request
    logger.info(f"Received emotion: '{emotion}'")
    # Check rate limit
    client_ip = request.client.host
    if not rate_limiter.check(client_ip):
        raise HTTPException(
            status_code=429, 
            detail="Rate limit exceeded. Please try again later."
        )
    
    logger.info(f"Received request to process image with instruction: {emotion}")
    
    try:
        # Validate instruction
        if len(emotion.strip()) == 0:
            logger.warning("Empty instruction provided")
            raise HTTPException(status_code=400, detail="Instruction cannot be empty")
        
        # Read the image
        try:
            contents = await image.read()
        except Exception as e:
            logger.error(f"Error reading uploaded file: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Error reading uploaded file: {str(e)}")
        
        # Validate image type using config
        image.file.seek(0)
        image_type = imghdr.what(None, contents)
        if image_type not in Config.SUPPORTED_IMAGE_TYPES:
            logger.warning(f"Unsupported image type: {image_type}")
            raise HTTPException(
                status_code=400, 
                detail=f"Only {', '.join(Config.SUPPORTED_IMAGE_TYPES)} images are supported"
            )
        
        # Validate image dimensions using config
        try:
            img = Image.open(io.BytesIO(contents))
            width, height = img.size
            if width > Config.MAX_IMAGE_WIDTH or height > Config.MAX_IMAGE_HEIGHT:
                logger.warning(f"Image too large: {width}x{height} pixels")
                raise HTTPException(
                    status_code=400, 
                    detail=f"Image dimensions cannot exceed {Config.MAX_IMAGE_WIDTH}x{Config.MAX_IMAGE_HEIGHT} pixels"
                )
            
            # Also check file size
            max_size_bytes = Config.MAX_IMAGE_SIZE_MB * 1024 * 1024
            if len(contents) > max_size_bytes:
                logger.warning(f"File too large: {len(contents) / (1024 * 1024):.2f}MB")
                raise HTTPException(
                    status_code=400, 
                    detail=f"Image size cannot exceed {Config.MAX_IMAGE_SIZE_MB}MB"
                )
        except Exception as e:
            logger.error(f"Error validating image: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Invalid image: {str(e)}")
        
        # Reset file pointer for further processing
        image.file.seek(0)
        
        # Process the image
        try:
            logger.info("Calling edit_image service")
            result = await edit_image(emotion, contents, image_type)
            logger.info("Successfully processed image")
            return {"image_url": result, "status": "success"}
        except HTTPException as e:
            # Re-raise HTTP exceptions from the service
            logger.error(f"Service error: {e.detail}")
            raise
        except Exception as e:
            # Catch any other unexpected errors
            logger.error(f"Unexpected error processing image: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")
            
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        # Catch-all for any other unexpected errors
        logger.error(f"Unexpected error in pix endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")