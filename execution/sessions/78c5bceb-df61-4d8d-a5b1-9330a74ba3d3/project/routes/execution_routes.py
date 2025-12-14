from flask import Blueprint
execution_bp = Blueprint("execution", __name__)

@execution_bp.route("/run")
def run():
    return {"status": "execution started"}
