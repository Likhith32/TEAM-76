
print("🚀 AUTOMEND AI – Library Execution Wrapper")
print("📦 Scanning Python files...")

import os
import importlib.util

loaded = False

for root, _, files in os.walk("."):
    for file in files:
        if file.endswith(".py") and not file.startswith("_"):
            try:
                path = os.path.join(root, file)
                name = file.replace(".py", "")
                spec = importlib.util.spec_from_file_location(name, path)
                module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(module)
                print(f"✅ Loaded: {file}")
                loaded = True
            except Exception as e:
                print(f"❌ Error loading {file}: {e}")

if not loaded:
    print("⚠️ No runnable Python modules detected")

print("🎉 Wrapper execution completed successfully")
