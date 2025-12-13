# LLaMA fallback analysis
# ai/llama_analyzer.py

from transformers import pipeline


class LlamaAnalyzer:
    def __init__(self, model_path):
        self.pipeline = pipeline(
            "text-generation",
            model=model_path,
            max_new_tokens=800
        )

    def analyze(self, prompt):
        result = self.pipeline(prompt)
        return result[0]["generated_text"]
