# core/project_loader.py
import os
import zipfile
import shutil
import subprocess
import uuid


def load_project(github_url=None, zip_file=None, target_dir=None):
    """
    Loads project from GitHub URL or ZIP file
    Returns absolute project path
    """

    if not target_dir:
        target_dir = f"/tmp/automend/{uuid.uuid4()}"

    os.makedirs(target_dir, exist_ok=True)

    project_path = os.path.join(target_dir, "project")

    if github_url:
        _clone_github_repo(github_url, project_path)
    elif zip_file:
        _extract_zip(zip_file, project_path)
    else:
        raise ValueError("Either github_url or zip_file is required")

    return project_path


def _clone_github_repo(github_url, project_path):
    if shutil.which("git") is None:
        raise EnvironmentError("Git is not installed")

    subprocess.run(
        ["git", "clone", "--depth", "1", github_url, project_path],
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )


def _extract_zip(zip_file, project_path):
    os.makedirs(project_path, exist_ok=True)

    with zipfile.ZipFile(zip_file) as zip_ref:
        zip_ref.extractall(project_path)
