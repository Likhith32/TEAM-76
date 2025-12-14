from flask import Blueprint
project_bp = Blueprint("project", __name__)

@project_bp.route("/upload")
def upload():
    return {"status": "project uploaded"}
