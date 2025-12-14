
import json
import re


def extract_json_block(text: str) -> dict | None:
    """
    Extract JSON object from text safely
    """

    # Remove markdown fences
    text = re.sub(r"```json|```", "", text, flags=re.IGNORECASE).strip()

    # Find first JSON object
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        return None

    try:
        return json.loads(match.group())
    except json.JSONDecodeError:
        return None


def parse_json_response(text: str) -> dict:
    """
    Parse AI output safely.
    Never raises fatal exceptions.
    """

    # 1️⃣ Try direct parse
    try:
        return json.loads(text)
    except Exception:
        pass

    # 2️⃣ Try extracting JSON from mixed text
    extracted = extract_json_block(text)
    if extracted:
        return extracted

    # 3️⃣ Fallback: treat entire response as explanation
    return {
        "explanation": text.strip(),
        "patch": ""
    }


def ensure_keys(data: dict, required_keys: list):
    """
    Ensure required keys exist.
    Fill missing keys safely.
    """
    for key in required_keys:
        if key not in data:
            data[key] = ""