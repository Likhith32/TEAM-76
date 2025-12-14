import subprocess
import os
import sys
import threading

EXECUTION_TIMEOUT = 20  # seconds


# -------------------------------
# INTERNAL RUNNER
# -------------------------------
def _run_command(cmd, cwd):
    try:
        process = subprocess.Popen(
            cmd,
            cwd=cwd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        timer = threading.Timer(EXECUTION_TIMEOUT, process.kill)
        try:
            timer.start()
            stdout, stderr = process.communicate()
        finally:
            timer.cancel()

        return {
            "success": process.returncode == 0,
            "exit_code": process.returncode,
            "stdout": stdout,
            "stderr": stderr
        }

    except Exception as e:
        return {
            "success": False,
            "exit_code": -1,
            "stdout": "",
            "stderr": str(e)
        }


# -------------------------------
# ENTRY FILE DETECTION
# -------------------------------
def has_entry_file(project_path):
    return (
        os.path.exists(os.path.join(project_path, "app.py")) or
        os.path.exists(os.path.join(project_path, "main.py"))
    )


# -------------------------------
# NORMAL PROJECT RUN
# -------------------------------
def run_normal(project_path):
    """
    Runs app.py or main.py
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


# -------------------------------
# AI WRAPPER EXECUTION (MAGIC)
# -------------------------------
def run_with_wrapper(project_path):
    """
    Creates and executes a temporary AI wrapper for library-style projects
    """
    wrapper_path = os.path.join(project_path, "_automend_runner.py")

    with open(wrapper_path, "w", encoding="utf-8") as f:
        f.write(
            """
import pkgutil
import importlib

print("🔍 AI Wrapper loading project modules...")

for _, mod, _ in pkgutil.iter_modules():
    if not mod.startswith("_"):
        try:
            m = importlib.import_module(mod)
            print(f"✅ Loaded module: {mod}")
        except Exception as e:
            print(f"❌ Failed to load {mod}: {e}")
"""
        )

    return _run_command([sys.executable, "_automend_runner.py"], project_path)


# -------------------------------
# MAIN ENTRY (FINAL)
# -------------------------------
def run_project(project_path, run_mode="normal"):
    """
    Central execution controller

    run_mode:
    - normal  : execute app.py / main.py
    - wrapper : execute AI-generated wrapper
    - test    : reserved for test execution
    """

    # 🚫 Handle library-style projects
    if not has_entry_file(project_path):
        if run_mode == "wrapper":
            return run_with_wrapper(project_path)

        return {
            "success": False,
            "status": "not_executable",
            "stderr": "Library-style project (no entry file)",
            "stdout": ""
        }

    # ✅ Normal execution
    return run_normal(project_path)
