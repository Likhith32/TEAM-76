AUTOMEND AI – Autonomous Code Debugging & Repair Platform

AUTOMEND AI is an execution-aware AI debugging platform that can run real software projects, detect runtime errors, automatically repair them, and re-execute the project to verify the solution — without manual intervention.

Unlike traditional AI coding assistants that only suggest fixes, AUTOMEND AI directly interacts with real codebases, making it highly effective for debugging complex projects during development and hackathons.

Hackathon Project – JNTU GV (December 2025)
Designed to demonstrate true autonomous debugging rather than prompt-based code suggestions.

Problem Statement

Modern software debugging is:

Time-consuming

Error-prone

Highly manual

Developers are required to:

Run code repeatedly

Interpret logs and stack traces

Manually hypothesize fixes

Re-test changes after each modification

Existing AI tools:

Do not execute real projects

Cannot verify whether a suggested fix actually works

This results in inefficient debugging workflows and unreliable fixes.

Solution – AUTOMEND AI

AUTOMEND AI is an autonomous debugging system that:

Accepts a complete project (ZIP file or GitHub repository)

Executes it in an isolated environment

Detects runtime failures

Uses AI to analyze execution errors

Applies verified patches automatically

Re-runs the project to confirm correctness

Returns the final working output along with corrected code

Key benefits:

No guesswork

No manual retry cycles

Fully execution-aware debugging

What Makes AUTOMEND AI Unique
Feature	Traditional AI Tools	AUTOMEND AI
Executes real projects	No	Yes
Reads stack traces	No	Yes
Applies patches automatically	No	Yes
Verifies fixes via execution	No	Yes
Handles library-only projects safely	No	Yes
Execution-aware AI	No	Yes
Project Structure
automend-ai/
├── backend/
│   ├── app.py                  # Flask entry point
│   ├── config.py               # Environment configuration
│   ├── api/
│   │   ├── runner_routes.py    # AI Runner API
│   │   ├── explainer_routes.py # Project explainer API
│   │   ├── testgen_routes.py   # Test generator API
│   ├── core/
│   │   ├── executor.py         # Secure execution engine
│   │   ├── sandbox.py          # Security validation
│   │   ├── patch_applier.py    # Patch application logic
│   │   ├── project_loader.py   # ZIP / GitHub loader
│   ├── ai/
│   │   ├── llama_engine.py     # LLaMA / Ollama integration
│   │   ├── prompt_templates.py
│   │   ├── response_parser.py
│   ├── workflows/
│   │   └── runner_flow.py      # Autonomous debug workflow
│   └── execution/
│       └── sessions/           # Isolated execution sessions
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Runner.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   ├── TestGenerator.jsx
│   │   │   └── ProjectExplainer.jsx
│   │   ├── hooks/
│   │   ├── api/
│   │   └── components/
│   ├── package.json
│   └── vite.config.js
│
└── README.md

Core Features
AI Runner

Executes real software projects

Detects runtime crashes

Automatically fixes bugs

Re-runs the project to validate fixes

Supports library projects using AI Wrapper Mode

Test Generator

Generates pytest-based test cases

Self-healing JSON and raw-code parsing

Allows downloading generated tests as a ZIP archive

Project Explainer

Explains project structure

Detects programming language and framework

Stores explanations in Supabase

AI Chatbot

Answers questions about the uploaded project

Provides context-aware responses based on code analysis

Safety and Guardrails

AUTOMEND AI is built with strict execution safety mechanisms:

Execution Guardrail
AI patching is blocked for non-executable projects by default.

Library Detection
Utility-only projects are identified and handled safely.

Patch Validation
Only valid Git-style unified diffs are applied.

Timeout Protection
Hard execution time limits prevent infinite loops and hangs.

AI Wrapper Mode (Hackathon Highlight)

For library-style projects (for example, utility modules):

The system does not fabricate fake entry files

Instead, it:

Automatically generates a temporary execution wrapper

Imports project modules safely

Executes real logic

Displays runtime behavior

Keeps the original codebase unchanged

This ensures ethical, safe, and intelligent execution.

Technology Stack
Backend

Python 3.9+

Flask

Ollama (LLaMA models)

Supabase (logging and explanations)

Frontend

React with Vite

Axios

Responsive modern UI

AI

LLaMA (local execution via Ollama)

Prompt-engineered structured outputs

Self-healing response parsing

Running the Project
Backend
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python app.py

Frontend
cd frontend
npm install
npm run dev


Open in browser:

http://localhost:5173

Recommended Demo Projects

Python applications with app.py or main.py

CLI tools

Flask applications

Intentionally buggy scripts

Library-only projects are supported through AI Wrapper Mode.

Why Judges Appreciate This Project

Real execution instead of prompt-only AI

Autonomous fix verification

Ethical and safe AI design

Clear engineering depth

Strong real-world developer value

License

MIT License — free to use, modify, and distribute.

Author

AUTOMEND AI
Hackathon Project – JNTU GV
December 2025