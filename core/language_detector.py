import os

# ===============================
# LANGUAGE DETECTION
# ===============================

def detect_language(project_path):
    """
    Detects primary programming language
    """
    for root, _, files in os.walk(project_path):
        for file in files:
            if file.endswith(".py"):
                return "python"
            if file.endswith(".java"):
                return "java"
    return "unknown"


# ===============================
# FRAMEWORK DETECTION
# ===============================

def detect_framework(project_path):
    """
    Detects common Python frameworks
    """
    for root, _, files in os.walk(project_path):
        if "manage.py" in files:
            return "django"

        for file in files:
            if file.endswith(".py"):
                try:
                    with open(os.path.join(root, file), "r", encoding="utf-8", errors="ignore") as f:
                        content = f.read()
                        if "Flask(" in content:
                            return "flask"
                        if "FastAPI(" in content:
                            return "fastapi"
                except Exception:
                    continue

    return "none"


# ===============================
# PROJECT TYPE DETECTION (NEW)
# ===============================

def detect_python_project_type(project_path):
    """
    Detects Python project type:
    - executable: has app.py or main.py
    - library: has functions but no entry point
    """

    has_entry = False
    has_functions = False

    for root, _, files in os.walk(project_path):
        for file in files:
            if file in ("app.py", "main.py"):
                has_entry = True

            if file.endswith(".py"):
                try:
                    with open(os.path.join(root, file), "r", encoding="utf-8", errors="ignore") as f:
                        if "def " in f.read():
                            has_functions = True
                except Exception:
                    continue

    if has_entry:
        return "executable"

    if has_functions:
        return "library"

    return "unknown"
