# backend/app/config.py
from pydantic import BaseSettings, AnyHttpUrl
from typing import List, Optional

class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "info"

    # Where the trained GNN model is stored
    MODEL_PATH: str = "models/cheb_gnn.pt"

    # Allowed CORS origins (frontends)
    CORS_ORIGINS: List[AnyHttpUrl] = []

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()