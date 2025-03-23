import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
env_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

class Config:
    # API Keys
    ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    
    # Image settings
    MAX_IMAGE_WIDTH = int(os.getenv("MAX_IMAGE_WIDTH", "8000"))
    MAX_IMAGE_HEIGHT = int(os.getenv("MAX_IMAGE_HEIGHT", "8000"))
    MAX_IMAGE_SIZE_MB = int(os.getenv("MAX_IMAGE_SIZE_MB", "5"))
    SUPPORTED_IMAGE_TYPES = os.getenv("SUPPORTED_IMAGE_TYPES", "jpeg,png").split(",")

    RATE_LIMIT_PER_MINUTE = int(os.getenv("RATE_LIMIT_PER_MINUTE", "1"))

    # API Models
    CLAUDE_MODEL = os.getenv("CLAUDE_MODEL", "claude-3-7-sonnet-20250219")
    DALLE_MODEL = os.getenv("DALLE_MODEL", "dall-e-3")
    CACHE_MAX_AGE_DAYS = int(os.getenv("CACHE_MAX_AGE_DAYS", "7"))
    
    # Validate required settings
    @classmethod
    def validate(cls):
        if not cls.ANTHROPIC_API_KEY:
            raise ValueError("ANTHROPIC_API_KEY environment variable is not set")
        if not cls.OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY environment variable is not set")

# Validate configuration on import
Config.validate()