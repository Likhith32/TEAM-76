from flask import Blueprint
patch_bp = Blueprint("patch", __name__)

@patch_bp.route("/apply")
def apply_patch():
    return {"status": "patch applied"}
