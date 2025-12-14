from flask import Blueprint, request, jsonify, send_file
import os
import uuid

from core.project_loader import load_project
from ai.llama_engine import generate_tests

# ===============================
# BLUEPRINT
# ===============================

testgen_bp = Blueprint("testgen", __name__)

# ===============================
# GENERATE TESTS
# ===============================

@testgen_bp.route("/generate", methods=["POST"])
def generate_and_run_tests():
    github_url = request.form.get("github_url")
    file = request.files.get("project")

    if not github_url and not file:
        return jsonify({
            "status": "error",
            "message": "GitHub URL or ZIP file is required"
        }), 400

    session_path = f"execution/sessions/{uuid.uuid4()}"
    os.makedirs(session_path, exist_ok=True)

    project_path = load_project(
        github_url=github_url,
        zip_file=file,
        target_dir=session_path
    )

    test_info = generate_tests(project_path)

    if not test_info.get("files"):
        return jsonify({
            "status": "warning",
            "framework": test_info.get("framework", "pytest"),
            "message": "No runnable tests could be generated for this project type."
        }), 200

    return jsonify({
        "status": "success",
        "framework": test_info["framework"],
        "tests": test_info["files"],
        "zip_path": test_info["zip_path"]
    }), 200

# ===============================
# DOWNLOAD ZIP
# ===============================

@testgen_bp.route("/download", methods=["GET"])
def download_tests():
    zip_path = request.args.get("path")

    if not zip_path or not os.path.exists(zip_path):
        return jsonify({"error": "File not found"}), 404

    return send_file(
        zip_path,
        as_attachment=True,
        download_name="generated_tests.zip"
    )
