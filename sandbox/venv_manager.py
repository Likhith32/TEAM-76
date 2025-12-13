# Python venv manager
# sandbox/venv_manager.py

import subprocess
import os


def create_venv(project_path):
    venv_path = os.path.join(project_path, "venv")
    subprocess.run(f"python -m venv {venv_path}", shell=True)
    return venv_path
