# core/sandbox.py
import os
import shutil
import time

# ===============================
# SECURITY CONFIG
# ===============================

MAX_PROJECT_SIZE_MB = 20

FORBIDDEN_PATTERNS = [
    "rm -rf",
    "shutdown",
    "reboot",
    "os.system",
    "subprocess.Popen",
    "eval(",
    "exec("
]

SERVER_RUN_PATTERNS = [
    "app.run(",
    "uvicorn.run",
    "gunicorn",
    "manage.py runserver"
]

# ===============================
# PROJECT VALIDATION
# ===============================

def validate_project(project_path: str) -> bool:
    """
    Basic security validation:
    - Size limit
    - Dangerous code patterns
    - Blocks live server projects
    """

    total_size = 0

    for root, _, files in os.walk(project_path):
        for file_name in files:
            file_path = os.path.join(root, file_name)

            # Skip binary & large files safely
            try:
                size = os.path.getsize(file_path)
            except OSError:
                continue

            total_size += size

            # Only scan text-based files
            if not file_name.endswith((".py", ".js", ".sh", ".txt")):
                continue

            try:
                with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
            except Exception:
                continue

            # ❌ Block dangerous commands
            for bad in FORBIDDEN_PATTERNS:
                if bad in content:
                    raise Exception(f"❌ Forbidden operation detected: {bad}")

            # ❌ Block server execution projects
            for server_pattern in SERVER_RUN_PATTERNS:
                if server_pattern in content:
                    raise Exception(
                        "❌ Server-based project detected. "
                        "AUTOMEND does not execute live servers."
                    )

    if total_size > MAX_PROJECT_SIZE_MB * 1024 * 1024:
        raise Exception("❌ Project too large")

    return True

# ===============================
# SERVER PROJECT DETECTION (UTILITY)
# ===============================

def is_server_project(project_path: str) -> bool:
    """
    Detects Flask / FastAPI / Django projects
    BEFORE patching or execution
    """

    for root, _, files in os.walk(project_path):
        if "app.py" in files:
            try:
                with open(os.path.join(root, "app.py"), "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                    if "app.run(" in content:
                        return True
            except Exception:
                pass

        if "manage.py" in files:
            return True

    return False

# ===============================
# SESSION CLEANUP
# ===============================

def cleanup_session(session_path: str, ttl: int = 3600):
    """
    Delete session folder after TTL
    """

    if not os.path.exists(session_path):
        return

    try:
        created_time = os.path.getctime(session_path)
    except OSError:
        return

    if time.time() - created_time > ttl:
        shutil.rmtree(session_path, ignore_errors=True)
