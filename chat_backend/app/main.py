from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text

from app.api.chat import router as chat_router
from app.websocket.socket import router as websocket_router

from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.database import engine


app = FastAPI(title=settings.APP_NAME)
UPLOAD_DIR = Path("/app/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
app.include_router(websocket_router)

app.include_router(chat_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Marketplace Chat API"}


@app.get("/health")
def health():

    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))

    return {
        "status": "healthy",
        "database": "connected"
    }