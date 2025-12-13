# Manage sandbox environments
# services/environment_manager.py

import os


def detect_environment(project_path):
    """
    Detect project type and framework
    """
    if os.path.exists(os.path.join(project_path, "requirements.txt")):
        return {
            "language": "python",
            "framework": "flask_or_python",
            "dependency_file": "requirements.txt"
        }

    if os.path.exists(os.path.join(project_path, "pyproject.toml")):
        return {
            "language": "python",
            "framework": "poetry",
            "dependency_file": "pyproject.toml"
        }

    if os.path.exists(os.path.join(project_path, "package.json")):
        return {
            "language": "javascript",
            "framework": "node",
            "dependency_file": "package.json"
        }

    return {
        "language": "unknown",
        "framework": "unknown",
        "dependency_file": None
    }
