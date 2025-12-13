# File helpers
# utils/file_utils.py

import os


def read_files(project_path, limit=5):
    files_data = []

    for root, _, files in os.walk(project_path):
        for file in files:
            if file.endswith((".py", ".js")):
                path = os.path.join(root, file)
                try:
                    with open(path, "r", encoding="utf-8") as f:
                        files_data.append(
                            {"file": file, "content": f.read()}
                        )
                except:
                    continue

            if len(files_data) >= limit:
                return files_data

    return files_data
