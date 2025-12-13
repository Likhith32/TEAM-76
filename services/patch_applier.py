# Apply git patches
# services/patch_applier.py

import subprocess
import os


def init_git_repo(project_path):
    if not os.path.exists(os.path.join(project_path, ".git")):
        subprocess.run("git init", cwd=project_path, shell=True)
        subprocess.run("git add .", cwd=project_path, shell=True)
        subprocess.run('git commit -m "Initial commit"', cwd=project_path, shell=True)


def apply_patch(project_path, patch_file_path):
    init_git_repo(project_path)

    result = subprocess.run(
        f"git apply {patch_file_path}",
        cwd=project_path,
        shell=True,
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        return {
            "success": False,
            "error": result.stderr
        }

    subprocess.run("git add .", cwd=project_path, shell=True)
    subprocess.run('git commit -m "AI applied fix"', cwd=project_path, shell=True)

    return {
        "success": True
    }


def revert_last_patch(project_path):
    result = subprocess.run(
        "git reset --hard HEAD~1",
        cwd=project_path,
        shell=True,
        capture_output=True,
        text=True
    )

    return result.returncode == 0
