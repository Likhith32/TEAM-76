import os
import uuid

from flask import Blueprint, request, jsonify

from core.project_loader import load_project
from core.language_detector import (
    detect_language,
    detect_framework,
    detect_python_project_type,
)
from core.dependency_installer import install_dependencies
from core.executor import run_project
from core.patch_applier import apply_patch
from core.sandbox import validate_project, is_server_project
from ai.llama_engine import analyze_error_and_fix

# ===============================
# CONFIG
# ===============================

MAX_FIX_ATTEMPTS = 3
BASE_SESSION_DIR = "execution/sessions"

# ===============================
# BLUEPRINT
# ===============================

runner_bp = Blueprint("runner", __name__)

# ===============================
# CORE WORKFLOW
# ===============================

def runner_workflow(github_url=None, zip_file=None, run_mode="safe"):
    """
    run_mode:
    - safe    : block non-executable projects
    - wrapper : AI-generated execution wrapper
    """

    # 1️⃣ Create isolated session
    session_id = str(uuid.uuid4())
    session_path = os.path.join(BASE_SESSION_DIR, session_id)
    os.makedirs(session_path, exist_ok=True)

    # 2️⃣ Load project
    project_path = load_project(
        github_url=github_url,
        zip_file=zip_file,
        target_dir=session_path
    )

    # 3️⃣ Security validation
    validate_project(project_path)

    # 🚫 Block server projects
    if is_server_project(project_path):
        return {
            "status": "failed",
            "reason": "Server applications cannot be auto-run safely",
            "hint": "Use Project Explainer instead"
        }

    # 🔍 Detect project type
    project_type = detect_python_project_type(project_path)

    # 🔥 Wrapper mode for libraries
    if project_type != "executable" and run_mode == "wrapper":
        execution = run_project(project_path, run_mode="wrapper")

        return {
            "status": "wrapper_executed",
            "message": "AI generated a temporary execution wrapper.",
            "output": execution.get("stdout", ""),
            "zip_ready": True
        }

    # 🚫 Non-executable project (safe mode)
    if project_type != "executable":
        return {
            "status": "not_executable",
            "project_type": "library",
            "message": "No entry file (app.py or main.py) found"
        }

    # 4️⃣ Detect language & framework
    language = detect_language(project_path)
    framework = detect_framework(project_path)

    # 5️⃣ Install dependencies
    install_dependencies(project_path, language)

    # 6️⃣ Execute project
    execution = run_project(project_path, run_mode=run_mode)

    # ✅ Success on first run
    if execution.get("success"):
        return {
            "status": "success",
            "language": language,
            "framework": framework,
            "output": execution.get("stdout", "")
        }

    # 🚫 Execution never really started → DO NOT AI DEBUG
    if execution.get("status") == "not_executable":
        return {
            "status": "not_executable",
            "message": execution.get("stderr", "")
        }

    # 🔥 REAL RUNTIME ERROR → AI DEBUG LOOP
    error_log = execution.get("stderr", "")
    fixes = []

    for attempt in range(MAX_FIX_ATTEMPTS):
        ai_fix = analyze_error_and_fix(error_log, project_path)
        apply_patch(project_path, ai_fix["patch"])

        fixes.append({
            "attempt": attempt + 1,
            "explanation": ai_fix["explanation"]
        })

        rerun = run_project(project_path, run_mode=run_mode)

        if rerun.get("success"):
            return {
                "status": "fixed",
                "language": language,
                "framework": framework,
                "fixes": fixes,
                "output": rerun.get("stdout", "")
            }

        error_log = rerun.get("stderr", "")

    # ❌ Final failure after retries
    return {
        "status": "failed",
        "language": language,
        "framework": framework,
        "fixes": fixes,
        "last_error": error_log
    }

# ===============================
# API ROUTE
# ===============================

@runner_bp.route("/run", methods=["POST"])
def run():
    github_url = request.form.get("github_url")
    zip_file = request.files.get("project")
    run_mode = request.form.get("run_mode", "safe")

    result = runner_workflow(
        github_url=github_url,
        zip_file=zip_file,
        run_mode=run_mode
    )

    return jsonify(result)
