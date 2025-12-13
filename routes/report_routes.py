# routes/report_routes.py

from flask import Blueprint, jsonify
from config.supabase import SessionLocal
from models.project import Project
from models.log import Log
from models.patch import Patch

report_routes = Blueprint("report_routes", __name__)


@report_routes.route("/project/report/<project_id>", methods=["GET"])
def project_report(project_id):
    db = SessionLocal()
    try:
        project = db.query(Project).filter(Project.id == project_id).first()
        logs = db.query(Log).filter(Log.project_id == project_id).all()
        patches = db.query(Patch).filter(Patch.project_id == project_id).all()

        return jsonify({
            "project": {
                "id": project.id,
                "source": project.source,
                "status": project.status,
                "created_at": project.created_at
            },
            "logs": [
                {
                    "stage": l.stage,
                    "stdout": l.stdout,
                    "stderr": l.stderr,
                    "time": l.created_at
                } for l in logs
            ],
            "patches": [
                {
                    "applied": p.applied,
                    "created_at": p.created_at
                } for p in patches
            ]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        db.close()
