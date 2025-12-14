import os
import threading
import time

from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# ===============================
# ENV SETUP
# ===============================
load_dotenv()

# ===============================
# CONFIG SELECTION
# ===============================
from config import DevelopmentConfig, ProductionConfig

def get_config():
    env = os.getenv("FLASK_ENV", "development").lower()
    return ProductionConfig if env == "production" else DevelopmentConfig

# ===============================
# IMPORT BLUEPRINTS & UTILS
# ===============================
from api import api_bp
from execution.clean_up import cleanup_old_sessions
from utils.logger import get_logger

logger = get_logger("AUTOMEND-APP")

# ===============================
# APP FACTORY
# ===============================
def create_app():
    app = Flask(__name__)
    app.config.from_object(get_config())

    # Enable CORS (frontend → backend)
    CORS(
        app,
        resources={r"/api/*": {"origins": app.config.get("CORS_ORIGINS", "*")}},
        supports_credentials=True
    )

    # Register API routes
    app.register_blueprint(api_bp, url_prefix="/api")

    # Root health endpoint
    @app.route("/", methods=["GET"])
    def root():
        return jsonify({
            "status": "running",
            "service": "AUTOMEND AI",
            "environment": app.config.get("ENV"),
            "version": "1.0"
        })

    # Optional health alias (useful for deployment)
    @app.route("/health", methods=["GET"])
    def health():
        return jsonify({"status": "ok"})

    return app

# ===============================
# BACKGROUND CLEANUP THREAD
# ===============================
def start_cleanup_thread():
    """
    Starts cleanup thread only once.
    Prevents duplicate threads in Flask debug reloader.
    """
    if os.environ.get("WERKZEUG_RUN_MAIN") != "true":
        return

    def cleanup_loop():
        while True:
            try:
                cleanup_old_sessions()
            except Exception as e:
                logger.error(f"Cleanup error: {e}")
            time.sleep(1800)  # 30 minutes

    threading.Thread(target=cleanup_loop, daemon=True).start()

# ===============================
# MAIN ENTRY
# ===============================
app = create_app()
start_cleanup_thread()

if __name__ == "__main__":
    logger.info("🚀 Starting AUTOMEND AI Backend")
    logger.info(
        f"ENV={app.config.get('ENV')} | "
        f"DEBUG={app.config.get('DEBUG')} | "
        f"PORT={os.getenv('PORT', 5000)}"
    )

    app.run(
        host="0.0.0.0",
        port=int(os.getenv("PORT", 5000)),
        debug=app.config["DEBUG"]
    )
