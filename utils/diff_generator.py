# Diff generation
# utils/diff_generator.py

import os
import uuid

PATCH_DIR = "storage/patches"


def save_patch(patch_content):
    os.makedirs(PATCH_DIR, exist_ok=True)
    patch_id = f"{uuid.uuid4()}.diff"
    patch_path = os.path.join(PATCH_DIR, patch_id)

    with open(patch_path, "w", encoding="utf-8") as f:
        f.write(patch_content)

    return patch_path
