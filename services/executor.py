# Execute project or tests
# services/executor.py

import subprocess
import os
import time


def execute_command(command, project_path, timeout=60):
    start_time = time.time()

    process = subprocess.Popen(
        command,
        cwd=project_path,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        shell=True,
        text=True
    )

    try:
        stdout, stderr = process.communicate(timeout=timeout)
        success = process.returncode == 0
    except subprocess.TimeoutExpired:
        process.kill()
        stdout, stderr = "", "Execution timed out"
        success = False

    return {
        "success": success,
        "stdout": stdout,
        "stderr": stderr,
        "execution_time": round(time.time() - start_time, 2)
    }


def run_project(project_path):
    # Default run strategy (customize later)
    if os.path.exists(os.path.join(project_path, "app.py")):
        return execute_command("python app.py", project_path)

    if os.path.exists(os.path.join(project_path, "package.json")):
        return execute_command("npm start", project_path)

    return {
        "success": False,
        "stdout": "",
        "stderr": "No runnable entry file found"
    }


def run_tests(project_path):
    if os.path.exists(os.path.join(project_path, "pytest.ini")):
        return execute_command("pytest", project_path)

    if os.path.exists(os.path.join(project_path, "package.json")):
        return execute_command("npm test -- --watch=false", project_path)

    return {
        "success": False,
        "stdout": "",
        "stderr": "No test framework detected"
    }
