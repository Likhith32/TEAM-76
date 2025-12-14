print("AUTOMEND AI - Library Execution Demo")

import pkgutil
import importlib

loaded = []
failed = []

for _, mod, _ in pkgutil.iter_modules():
    if not mod.startswith("_"):
        try:
            importlib.import_module(mod)
            loaded.append(mod)
        except Exception as e:
            failed.append(f"{mod}: {e}")

print("\nLoaded Modules:")
for m in loaded:
    print(" -", m)

print("\nFailed Modules:")
for f in failed:
    print(" -", f)
