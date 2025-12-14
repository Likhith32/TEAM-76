# api/explainer_routes.py

from flask import Blueprint, request, jsonify
import os
import uuid

from supabase import create_client

from core.language_detector import detect_language, detect_framework
from core.project_loader import load_project
from ai.llama_engine import explain_project

# -------------------------
# Blueprint
# -------------------------
explainer_bp = Blueprint("explainer", __name__)

# -------------------------
# Supabase Client (SAFE)
# -------------------------
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

supabase = None
if SUPABASE_URL and SUPABASE_SERVICE_KEY:
    supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# -------------------------
# Route: Explain Project
# -------------------------
@explainer_bp.route("/analyze", methods=["POST"])
def analyze():
    try:
        github_url = request.form.get("github_url")
        zip_file = request.files.get("project")

        if not github_url and not zip_file:
            return jsonify({
                "status": "error",
                "message": "No project source provided"
            }), 400

        # Create execution session
        session_id = str(uuid.uuid4())
        session_path = os.path.join("execution", "sessions", session_id)
        os.makedirs(session_path, exist_ok=True)

        # Load project
        project_path = load_project(
            github_url=github_url,
            zip_file=zip_file,
            target_dir=session_path
        )

        # Detect metadata
        language = detect_language(project_path)
        framework = detect_framework(project_path)

        # Build project structure
        structure = []
        for root, dirs, files in os.walk(project_path):
            rel_root = root.replace(project_path, "").lstrip("\\/")
            structure.append(f"{rel_root}/")
            for f in files:
                structure.append(f"  {f}")

        # Call AI explainer
        ai_result = explain_project(
            project_path=project_path,
            language=language,
            framework=framework,
            structure="\n".join(structure)
        )

        # Save to Supabase (optional)
        if supabase:
            supabase.table("project_explanations").insert({
                "project_id": None,  # link later if needed
                "summary": ai_result.get("summary"),
                "architecture": ai_result.get("architecture"),
                "tech_stack": ai_result.get("tech_stack"),
                "entry_points": ai_result.get("entry_points")
            }).execute()

        return jsonify({
            "status": "success",
            "session_id": session_id,
            "language": language,
            "framework": framework,
            "explanation": ai_result
        })

    except Exception as e:
        # NEVER crash the API
        return jsonify({
            "status": "failed",
            "error": str(e)
        }), 200
