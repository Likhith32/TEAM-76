# workflows/testgen_flow.py
import os
import uuid

from core.project_loader import load_project
from core.language_detector import detect_language
from core.dependency_installer import install_dependencies
from core.executor import run_tests
from core.sandbox import validate_project
from ai.llama_engine import generate_tests


def testgen_workflow(
    github_url=None,
    zip_file=None
):
    """
    Generate and execute tests automatically
    """

    # 1️⃣ Create session
    session_id = str(uuid.uuid4())
    session_path = f"execution/sessions/{session_id}"
    os.makedirs(session_path, exist_ok=True)

    # 2️⃣ Load project
    project_path = load_project(
        github_url=github_url,
        zip_file=zip_file,
        target_dir=session_path
    )

    # 3️⃣ Validate safety
    validate_project(project_path)

    # 4️⃣ Detect language
    language = detect_language(project_path)

    if language != "python":
        return {
            "status": "failed",
            "reason": "Test generation currently supports Python only"
        }

    # 5️⃣ Install dependencies
    install_dependencies(project_path, language)

    # 6️⃣ Generate tests using AI
    test_data = generate_tests(project_path)

    test_files = test_data["files"]
    framework = test_data["framework"]

    # 7️⃣ Run tests
    test_result = run_tests(project_path, framework)

    return {
        "status": "success",
        "language": language,
        "framework": framework,
        "generated_tests": test_files,
        "test_result": test_result
    }
