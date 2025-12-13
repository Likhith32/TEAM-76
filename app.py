from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# -----------------------------
# App Initialization
# -----------------------------
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "codepilot-secret-key")

# Enable CORS for React frontend
CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    supports_credentials=True
)

# -----------------------------
# Import Routes
# -----------------------------
from routes.project_routes import project_routes
from routes.execution_routes import execution_routes
from routes.patch_routes import patch_routes
from routes.report_routes import report_routes

# -----------------------------
# Register Blueprints
# -----------------------------
app.register_blueprint(project_routes)
app.register_blueprint(execution_routes)
app.register_blueprint(patch_routes)
app.register_blueprint(report_routes)

# -----------------------------
# Health Check
# -----------------------------
@app.route("/", methods=["GET"])
def health_check():
    return {
        "status": "running",
        "service": "AUTOMEND AI",
        "version": "1.0.0"
    }

# -----------------------------
# App Runner
# -----------------------------
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
