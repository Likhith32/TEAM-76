import os
import uuid
from flask import Blueprint, request, jsonify

from core.project_loader import load_project
from core.executor import run_project

from ai.llama_engine import analyze_error_and_fix
from core.patch_applier import apply_patch

runner_bp = Blueprint("runner", __name__)
@runner_bp.route("/run", methods=["POST"])
def run():
    github_url = request.form.get("github_url")
    file = request.files.get("project")
    run_mode = request.form.get("run_mode", "normal")

    session_id = str(uuid.uuid4())
    session_path = f"execution/sessions/{session_id}"
    os.makedirs(session_path, exist_ok=True)

    project_path = load_project(
        github_url=github_url,
        zip_file=file,
        target_dir=session_path
    )

    result = run_project(project_path, run_mode=run_mode)

    if result.get("success"):
        return jsonify({
            "status": result.get("status", "success"),
            "output": result.get("stdout", "")
        })

    if result.get("status") == "not_executable":
        return jsonify(result)

    ai_fix = analyze_error_and_fix(
        error_log=result.get("stderr", ""),
        project_path=project_path
    )

    apply_patch(project_path, ai_fix["patch"])

    rerun = run_project(project_path, run_mode=run_mode)

    return jsonify({
        "status": "fixed" if rerun.get("success") else "failed",
        "output": rerun.get("stdout", ""),
        "fixes": [{"explanation": ai_fix["explanation"]}],
        "last_error": None if rerun.get("success") else rerun.get("stderr")
    })
