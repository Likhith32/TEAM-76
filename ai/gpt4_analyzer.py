# GPT-4 error analysis logic
# ai/gpt4_analyzer.py

import openai
from ai.prompt_templates import ERROR_ANALYSIS_PROMPT

openai.api_key = None  # loaded from env


def analyze_error(language, error_logs, files):
    prompt = ERROR_ANALYSIS_PROMPT.format(
        language=language,
        error_logs=error_logs,
        files=files
    )

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a senior software engineer."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    return response.choices[0].message.content
