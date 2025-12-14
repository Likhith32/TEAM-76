# utils/security.py
import os
import re


ALLOWED_EXTENSIONS = {
    ".py", ".txt", ".md", ".json", ".yaml", ".yml", ".env",
    ".java", ".xml", ".ini"
}


def is_safe_path(base_path: str, target_path: str) -> bool:
    """
    Prevent path traversal attacks
    """
    return os.path.realpath(target_path).startswith(
        os.path.realpath(base_path)
    )


def is_allowed_file(filename: str) -> bool:
    """
    Check if file extension is allowed
    """
    _, ext = os.path.splitext(filename)
    return ext.lower() in ALLOWED_EXTENSIONS


def sanitize_text(text: str) -> str:
    """
    Remove dangerous characters from input
    """
    return re.sub(r"[;&|`$<>]", "", text)
