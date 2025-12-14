# config.py
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()


class Config:
    """
    Base configuration for AUTOMEND AI
    """

    # ===============================
    # FLASK
    # ===============================
    SECRET_KEY = os.getenv("SECRET_KEY", "automend-secret-key")
    DEBUG = os.getenv("FLASK_DEBUG", "true").lower() == "true"

    MAX_CONTENT_LENGTH = 50 * 1024 * 1024  # 50 MB upload limit

    # ===============================
    # SUPABASE
    # ===============================
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

    # ===============================
    # AI (LLaMA / Ollama)
    # ===============================
    OLLAMA_URL = os.getenv(
        "OLLAMA_URL",
        "http://localhost:11434/api/generate"
    )

    LLAMA_MODEL = os.getenv(
        "LLAMA_MODEL",
        "llama3"
    )

    # ===============================
    # EXECUTION / SANDBOX
    # ===============================
    EXECUTION_TIMEOUT = int(
        os.getenv("EXECUTION_TIMEOUT", 20)
    )

    SESSION_ROOT = os.getenv(
        "SESSION_ROOT",
        "execution/sessions"
    )

    SESSION_TTL_SECONDS = int(
        os.getenv("SESSION_TTL_SECONDS", 3600)
    )

    # ===============================
    # SECURITY
    # ===============================
    ALLOWED_LANGUAGES = ["python", "java"]
    MAX_FIX_ATTEMPTS = int(os.getenv("MAX_FIX_ATTEMPTS", 3))

    # ===============================
    # LOGGING
    # ===============================
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False
