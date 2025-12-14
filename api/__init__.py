# api/__init__.py
from flask import Blueprint

api_bp = Blueprint("api", __name__)

from .chatbot_routes import chatbot_bp
from .runner_routes import runner_bp
from .explainer_routes import explainer_bp
from .testgen_routes import testgen_bp

api_bp.register_blueprint(chatbot_bp, url_prefix="/chatbot")
api_bp.register_blueprint(runner_bp, url_prefix="/runner")
api_bp.register_blueprint(explainer_bp, url_prefix="/explainer")
api_bp.register_blueprint(testgen_bp, url_prefix="/testgen")
