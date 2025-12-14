# api/chatbot_routes.py
from flask import Blueprint, request, jsonify
from ai.llama_engine import run_llama_chat
from supabase import create_client
import os

chatbot_bp = Blueprint("chatbot", __name__)

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY")
)

@chatbot_bp.route("/chat", methods=["POST"])
def chat():
    """
    Body:
    {
      "user_id": "uuid",
      "message": "Explain python decorators"
    }
    """
    data = request.json
    user_id = data.get("user_id")
    message = data.get("message")

    if not message:
        return jsonify({"error": "Message is required"}), 400

    # Run LLaMA
    ai_reply = run_llama_chat(message)

    # Store chat (optional for MVP)
    session = supabase.table("chat_sessions").insert({
        "user_id": user_id
    }).execute()

    session_id = session.data[0]["id"]

    supabase.table("chat_messages").insert([
        {"session_id": session_id, "role": "user", "message": message},
        {"session_id": session_id, "role": "ai", "message": ai_reply}
    ]).execute()

    return jsonify({
        "reply": ai_reply
    })
