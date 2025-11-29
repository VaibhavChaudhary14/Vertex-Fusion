# backend/app/config.py
from typing import List, Optional

from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # General
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "info"

    # Where your trained Chebyshev GNN model lives
    MODEL_PATH: str = "models/cheb_gnn.pt"

    # Frontend origins allowed to call this API
    # In production, set this via env to your Vercel URL
    CORS_ORIGINS: List[AnyHttpUrl] = []

    # Optional: if you had this before, keep it but make it optional
    # so Pydantic doesn't fail when env isn't set.
    api_url: Optional[AnyHttpUrl] = None

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
