import os
import requests
import zipfile

from ai.prompt_templates import (
    CHATBOT_PROMPT,
    DEBUG_PROMPT,
    EXPLAINER_PROMPT,
    TESTGEN_PROMPT
)
from ai.response_parser import parse_json_response, ensure_keys

# ===============================
# CONFIG
# ===============================

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate")
MODEL_NAME = os.getenv("LLAMA_MODEL", "llama3")

HEADERS = {
    "Content-Type": "application/json"
}

# ===============================
# CORE LLaMA CALL
# ===============================

def _call_llama(prompt: str) -> str:
    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False
    }

    try:
        response = requests.post(
            OLLAMA_URL,
            json=payload,
            headers=HEADERS,
            timeout=120
        )
    except requests.RequestException as e:
        raise RuntimeError(f"Ollama connection failed: {e}")

    if response.status_code != 200:
        raise RuntimeError(f"LLaMA error: {response.text}")

    return response.json().get("response", "")

# ===============================
# CHATBOT
# ===============================

def run_llama_chat(message: str) -> str:
    prompt = CHATBOT_PROMPT.format(message=message)
    return _call_llama(prompt).strip()

# ===============================
# DEBUGGER
# ===============================

def analyze_error_and_fix(error_log: str, project_path: str) -> dict:
    context = f"Project path: {project_path}"

    prompt = DEBUG_PROMPT.format(
        error_log=error_log,
        context=context
    )

    raw = _call_llama(prompt)
    parsed = parse_json_response(raw)

    ensure_keys(parsed, ["explanation", "patch"])

    return {
        "explanation": parsed["explanation"],
        "patch": parsed["patch"]
    }

# ===============================
# PROJECT EXPLAINER
# ===============================

def explain_project(project_path: str, language: str, framework: str, structure: str) -> dict:
    prompt = EXPLAINER_PROMPT.format(
        structure=structure,
        language=language,
        framework=framework
    )

    explanation = _call_llama(prompt)

    return {
        "summary": explanation.strip(),
        "language": language,
        "framework": framework
    }

# ===============================
# TEST GENERATOR (ZIP ENABLED)
# ===============================

def generate_tests(project_path: str) -> dict:
    context = f"Python project at {project_path}"
    prompt = TESTGEN_PROMPT.format(context=context)

    raw = _call_llama(prompt)

    # Debug output
    with open("last_testgen_ai_output.txt", "w", encoding="utf-8") as f:
        f.write(raw)

    parsed = parse_json_response(raw)
    ensure_keys(parsed, ["framework", "files"])

    # Smart fallback: raw pytest code
    if isinstance(parsed.get("files"), str):
        parsed["files"] = {
            "test_generated.py": parsed["files"]
        }

    if not isinstance(parsed["files"], dict):
        return {
            "framework": parsed.get("framework", "pytest"),
            "files": {},
            "warning": "Invalid test format"
        }

    written_files = {}

    for filename, code in parsed["files"].items():
        if not filename.endswith(".py"):
            continue

        path = os.path.join(project_path, filename)
        with open(path, "w", encoding="utf-8") as f:
            f.write(code)

        written_files[filename] = code

    # 🔥 ZIP CREATION
    zip_path = os.path.join(project_path, "generated_tests.zip")

    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        for filename in written_files.keys():
            zipf.write(
                os.path.join(project_path, filename),
                arcname=filename
            )

    return {
        "framework": parsed.get("framework", "pytest"),
        "files": written_files,
        "zip_path": zip_path
    }
