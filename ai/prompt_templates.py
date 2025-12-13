# Prompt templates
# ai/prompt_templates.py

ERROR_ANALYSIS_PROMPT = """
You are an expert software debugger.

Project language: {language}

Error Logs:
{error_logs}

Relevant Files:
{files}

Tasks:
1. Identify root cause
2. Suggest exact fix
3. Generate a unified diff patch
4. Explain the fix briefly

Return JSON with:
- root_cause
- explanation
- patch
"""
