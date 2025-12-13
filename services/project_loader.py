# Load and extract projects
# services/project_loader.py

import os
import zipfile
import shutil
import uuid
from git import Repo

BASE_PROJECT_PATH = "storage/projects"


def create_project_dir():
    project_id = str(uuid.uuid4())
    project_path = os.path.join(BASE_PROJECT_PATH, project_id)
    os.makedirs(project_path, exist_ok=True)
    return project_id, project_path


def load_from_github(repo_url: str):
    project_id, project_path = create_project_dir()

    try:
        Repo.clone_from(repo_url, project_path)
        return {
            "project_id": project_id,
            "project_path": project_path,
            "source": "github"
        }
    except Exception as e:
        shutil.rmtree(project_path, ignore_errors=True)
        raise Exception(f"Git clone failed: {str(e)}")


def load_from_zip(zip_file_path: str):
    project_id, project_path = create_project_dir()

    try:
        with zipfile.ZipFile(zip_file_path, "r") as zip_ref:
            zip_ref.extractall(project_path)

        return {
            "project_id": project_id,
            "project_path": project_path,
            "source": "zip"
        }
    except Exception as e:
        shutil.rmtree(project_path, ignore_errors=True)
        raise Exception(f"ZIP extraction failed: {str(e)}")
