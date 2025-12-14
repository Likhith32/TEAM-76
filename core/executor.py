import subprocess
import os
import sys
import threading

EXECUTION_TIMEOUT = 20  # seconds


def _run_command(cmd, cwd):
    """
    Runs a command safely with timeout protection.
    """
    try:
        process = subprocess.Popen(
            cmd,
            cwd=cwd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        timer = threading.Timer(EXECUTION_TIMEOUT, process.kill)
        timer.start()
        stdout, stderr = process.communicate()
        timer.cancel()

        return {
            "success": process.returncode == 0,
            "stdout": stdout or "",
            "stderr": stderr or ""
        }

    except Exception as e:
        return {
            "success": False,
            "stdout": "",
            "stderr": str(e)
        }


def has_entry_file(project_path):
    """
    Checks whether the project is executable.
    """
    return (
        os.path.exists(os.path.join(project_path, "app.py")) or
        os.path.exists(os.path.join(project_path, "main.py"))
    )


def run_normal(project_path):
    """
    Runs normal executable projects.
    """
    if os.path.exists(os.path.join(project_path, "app.py")):
        return _run_command([sys.executable, "app.py"], project_path)

    if os.path.exists(os.path.join(project_path, "main.py")):
        return _run_command([sys.executable, "main.py"], project_path)

    return {
        "success": False,
        "stdout": "",
        "stderr": "No entry file (app.py or main.py) found"
    }
def run_with_wrapper(project_path):
    from core.ai_wrapper import create_ai_wrapper

    create_ai_wrapper(project_path)

    result = _run_command(
        [sys.executable, "automend_runner.py"],
        project_path
    )
    result["status"] = "wrapper_executed"
    return result

def run_project(project_path, run_mode="normal"):
    """
    Main execution controller for AUTOMEND AI.
    """
    if not has_entry_file(project_path):
        if run_mode == "wrapper":
            return run_with_wrapper(project_path)

        return {
            "success": False,
            "status": "not_executable",
            "stdout": "",
            "stderr": "Library-style project (no app.py or main.py)"
        }

    return run_normal(project_path)
