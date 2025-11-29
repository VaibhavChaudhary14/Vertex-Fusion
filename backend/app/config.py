# app/config.py
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Optional, Any
from pydantic import AnyHttpUrl

class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"
    MODEL_PATH: str = "./model.pt"
    CORS_ORIGINS: Optional[List[str]] = []
    API_URL: AnyHttpUrl = "http://localhost:8000"  # <--- add a default

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

settings = Settings()
