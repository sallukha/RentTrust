from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str
    HOST: str
    PORT: int
    DEBUG: bool

    DATABASE_URL: str

    JWT_SECRET: str
    JWT_ALGORITHM: str

    class Config:
        env_file = ".env"


settings = Settings()