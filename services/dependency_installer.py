# Install dependencies
# services/dependency_installer.py

import subprocess


def install_python_dependencies(project_path):
    result = subprocess.run(
        "pip install -r requirements.txt",
        cwd=project_path,
        shell=True,
        capture_output=True,
        text=True
    )

    return {
        "success": result.returncode == 0,
        "stdout": result.stdout,
        "stderr": result.stderr
    }


def install_node_dependencies(project_path):
    result = subprocess.run(
        "npm install",
        cwd=project_path,
        shell=True,
        capture_output=True,
        text=True
    )

    return {
        "success": result.returncode == 0,
        "stdout": result.stdout,
        "stderr": result.stderr
    }


def install_dependencies(env_info, project_path):
    if env_info["language"] == "python":
        return install_python_dependencies(project_path)

    if env_info["language"] == "javascript":
        return install_node_dependencies(project_path)

    return {
        "success": False,
        "stdout": "",
        "stderr": "Unsupported project type"
    }
