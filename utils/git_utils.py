# utils/git_utils.py
import subprocess
import re
import shutil
import zipfile


GITHUB_REGEX = r"^https:\/\/github\.com\/[\w\-]+\/[\w\-\.]+(\.git)?$"


def is_valid_github_url(url: str) -> bool:
    """
    Validate GitHub repository URL
    """
    return bool(re.match(GITHUB_REGEX, url))


def clone_repo(github_url: str, target_dir: str):
    """
    Clone a GitHub repository safely
    """
    if not is_valid_github_url(github_url):
        raise ValueError("Invalid GitHub repository URL")

    if shutil.which("git") is None:
        raise EnvironmentError("Git is not installed")

    subprocess.run(
        ["git", "clone", "--depth", "1", github_url, target_dir],
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )


def get_repo_info(project_path: str) -> dict:
    """
    Returns basic Git repository information
    """
    try:
        branch = subprocess.check_output(
            ["git", "branch", "--show-current"],
            cwd=project_path
        ).decode().strip()

        commit = subprocess.check_output(
            ["git", "rev-parse", "HEAD"],
            cwd=project_path
        ).decode().strip()

        return {
            "branch": branch,
            "commit": commit
        }
    except Exception:
        return {}
