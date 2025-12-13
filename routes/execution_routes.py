# routes/execution_routes.py

from flask import Blueprint, request, jsonify
from services.environment_manager import detect_environment
from services.dependency_installer import install_dependencies
from services.executor import run_project
from config.supabase import SessionLocal
from models.log import Log
from models.project import Project
import uuid

execution_routes = Blueprint("execution_routes", __name__)


@execution_routes.route("/project/execute", methods=["POST"])
def execute_project():
    db = SessionLocal()
    try:
        data = request.json
        project_id = data["project_id"]
        project_path = data["project_path"]

        env = detect_environment(project_path)

        # Install dependencies
        dep = install_dependencies(env, project_path)

        dep_log = Log(
            id=str(uuid.uuid4()),
            project_id=project_id,
            stage="dependency_install",
            stdout=dep["stdout"],
            stderr=dep["stderr"]
        )
        db.add(dep_log)
        db.commit()

        if not dep["success"]:
            db.query(Project).filter(Project.id == project_id).update(
                {"status": "failed"}
            )
            db.commit()
            return jsonify({"status": "failed", "stage": "dependency_install"}), 400

        # Execute project
        exec_result = run_project(project_path)

        exec_log = Log(
            id=str(uuid.uuid4()),
            project_id=project_id,
            stage="execution",
            stdout=exec_result["stdout"],
            stderr=exec_result["stderr"]
        )
        db.add(exec_log)

        # Update project status
        new_status = "failed" if not exec_result["success"] else "running"
        db.query(Project).filter(Project.id == project_id).update(
            {"status": new_status}
        )

        db.commit()

        return jsonify({
            "status": new_status,
            "execution": exec_result,
            "env": env
        }), 200

    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        db.close()
