# Docker sandbox controller
# sandbox/docker_manager.py

import subprocess


def run_in_docker(image, project_path, command):
    docker_cmd = f"""
    docker run --rm \
    -v {project_path}:/app \
    -w /app \
    {image} {command}
    """

    result = subprocess.run(
        docker_cmd,
        shell=True,
        capture_output=True,
        text=True
    )

    return {
        "success": result.returncode == 0,
        "stdout": result.stdout,
        "stderr": result.stderr
    }
