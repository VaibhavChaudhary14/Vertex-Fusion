# backend/app/config.py
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl

class Settings(BaseSettings):
    api_url: AnyHttpUrl
    debug: bool = False

    class Config:
        env_file = ".env"  # optional, if you have environment variables

settings = Settings()
