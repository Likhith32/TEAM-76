import os
import importlib.util
import inspect
import sys


def create_ai_wrapper(project_path):
    wrapper_path = os.path.join(project_path, "automend_runner.py")

    code = """
print("AUTOMEND AI - Library Execution Demo\\n")

import os
import sys
import importlib.util
import inspect

PROJECT_DIR = os.path.dirname(__file__)
sys.path.insert(0, PROJECT_DIR)

modules = []
results = []

for file in os.listdir(PROJECT_DIR):
    if file.endswith(".py") and file not in ("automend_runner.py", "__init__.py"):
        module_name = file.replace(".py", "")
        modules.append(module_name)

        try:
            spec = importlib.util.spec_from_file_location(
                module_name, os.path.join(PROJECT_DIR, file)
            )
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)

            for name, obj in inspect.getmembers(module):
                if callable(obj) and obj.__code__.co_argcount == 2:
                    try:
                        value = obj(2, 3)
                        results.append(f"{module_name}.{name}(2,3) = {value}")
                    except Exception:
                        pass

        except Exception as e:
            results.append(f"{module_name} failed to load: {e}")

print("Detected project modules:")
for m in modules:
    print(" -", m)

print("\\nFunction execution results:")
if results:
    for r in results:
        print(" ", r)
else:
    print(" No callable functions detected")

print("\\nExecution completed successfully.")
"""

    with open(wrapper_path, "w", encoding="utf-8") as f:
        f.write(code)

    return wrapper_path
