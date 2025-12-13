# routes/patch_routes.py

from flask import Blueprint, request, jsonify
from utils.diff_generator import save_patch
from services.patch_applier import apply_patch
from services.executor import run_project
from config.supabase import SessionLocal
from models.patch import Patch
from models.log import Log
from models.project import Project
import uuid

patch_routes = Blueprint("patch_routes", __name__)


@patch_routes.route("/project/apply-patch", methods=["POST"])
def apply_ai_patch():
    db = SessionLocal()
    try:
        data = request.json
        project_id = data["project_id"]
        project_path = data["project_path"]
        patch_content = data["patch"]

        patch_id = str(uuid.uuid4())

        # Save patch in DB
        patch = Patch(
            id=patch_id,
            project_id=project_id,
            patch_content=patch_content,
            applied="no"
        )
        db.add(patch)
        db.commit()

        patch_path = save_patch(patch_content)

        # Apply patch
        result = apply_patch(project_path, patch_path)
        if not result["success"]:
            return jsonify({"status": "failed", "error": result["error"]}), 400

        # Re-run project
        execution = run_project(project_path)

        log = Log(
            id=str(uuid.uuid4()),
            project_id=project_id,
            stage="post_patch_execution",
            stdout=execution["stdout"],
            stderr=execution["stderr"]
        )
        db.add(log)

        # Update patch + project
        db.query(Patch).filter(Patch.id == patch_id).update({"applied": "yes"})
        db.query(Project).filter(Project.id == project_id).update(
            {"status": "fixed" if execution["success"] else "failed"}
        )

        db.commit()

        return jsonify({
            "status": "fixed" if execution["success"] else "failed",
            "execution": execution
        }), 200

    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        db.close()
