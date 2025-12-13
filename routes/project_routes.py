# routes/project_routes.py

from flask import Blueprint, request, jsonify
from services.project_loader import load_from_github, load_from_zip
from config.supabase import SessionLocal
from models.project import Project
import uuid
import os

project_routes = Blueprint("project_routes", __name__)


@project_routes.route("/project/upload", methods=["POST"])
def upload_project():
    db = SessionLocal()
    try:
        # GitHub repo
        repo_url = request.json.get("repo_url") if request.is_json else None

        if repo_url:
            project = load_from_github(repo_url)
            source = "github"

        # ZIP upload
        elif "file" in request.files:
            file = request.files["file"]
            zip_path = os.path.join("storage", file.filename)
            file.save(zip_path)
            project = load_from_zip(zip_path)
            os.remove(zip_path)
            source = "zip"

        else:
            return jsonify({"error": "No project source provided"}), 400

        # Save project to DB
        new_project = Project(
            id=project["project_id"],
            source=source,
            status="created"
        )
        db.add(new_project)
        db.commit()

        return jsonify({
            "status": "success",
            "project": project
        }), 200

    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        db.close()
