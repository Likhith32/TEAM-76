# workflows/explainer_flow.py
import os
import uuid

from core.project_loader import load_project
from core.language_detector import detect_language, detect_framework
from core.sandbox import validate_project
from ai.llama_engine import explain_project


def explainer_workflow(
    github_url=None,
    zip_file=None
):
    """
    Full project explanation workflow
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

    # 3️⃣ Validate project safety
    validate_project(project_path)

    # 4️⃣ Detect language & framework
    language = detect_language(project_path)
    framework = detect_framework(project_path)

    # 5️⃣ Collect structure
    structure = []
    for root, dirs, files in os.walk(project_path):
        level = root.replace(project_path, "").count(os.sep)
        indent = "  " * level
        structure.append(f"{indent}{os.path.basename(root)}/")
        for f in files:
            structure.append(f"{indent}  {f}")

    # 6️⃣ AI explanation
    explanation = explain_project(
        project_path=project_path,
        language=language,
        framework=framework,
        structure="\n".join(structure)
    )

    return {
        "status": "success",
        "language": language,
        "framework": framework,
        "structure": structure,
        "explanation": explanation
    }
