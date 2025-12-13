# Run test suites
# services/test_runner.py

from services.executor import execute_command
import os


def run_tests(project_path):
    if os.path.exists(os.path.join(project_path, "pytest.ini")):
        return execute_command("pytest", project_path)

    if os.path.exists(os.path.join(project_path, "package.json")):
        return execute_command("npm test -- --watch=false", project_path)

    return {
        "success": False,
        "stdout": "",
        "stderr": "No supported test framework found"
    }
