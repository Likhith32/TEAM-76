
print("AUTOMEND AI – Library Execution Demo")

import pkgutil
import importlib

for _, mod, _ in pkgutil.iter_modules():
    if not mod.startswith("_"):
        try:
            importlib.import_module(mod)
            print("✅ Loaded:", mod)
        except Exception as e:
            print("❌ Failed:", mod, "-", e)
