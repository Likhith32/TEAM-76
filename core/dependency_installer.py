# core/dependency_installer.py
import subprocess
import os
import sys


def install_dependencies(project_path, language="python"):
    """
    Installs project dependencies
    """

    if language == "python":
        req_file = os.path.join(project_path, "requirements.txt")

        if os.path.exists(req_file):
            return _install_python_requirements(project_path, req_file)

    return {"status": "skipped"}


def _install_python_requirements(project_path, req_file):
    try:
        subprocess.run(
            [sys.executable, "-m", "pip", "install", "-r", req_file],
            cwd=project_path,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        return {"status": "installed"}
    except subprocess.CalledProcessError as e:
        return {
            "status": "failed",
            "error": e.stderr.decode()
        }
