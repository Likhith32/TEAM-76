# workflows/chatbot_flow.py
from ai.llama_engine import run_llama_chat


def chatbot_workflow(user_message: str) -> dict:
    """
    Handles chatbot logic
    """

    ai_reply = run_llama_chat(user_message)

    return {
        "success": True,
        "reply": ai_reply
    }
