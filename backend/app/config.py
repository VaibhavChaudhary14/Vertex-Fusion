# backend/app/config.py
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # General
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "info"

    # Path to your trained GNN model
    MODEL_PATH: str = "models/cheb_gnn.pt"

    # Simple CORS setting:
    # "*"  -> allow all (default)
    # "https://foo.com" or "https://foo.com,https://bar.com"
    CORS_ORIGINS: str = "*"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
