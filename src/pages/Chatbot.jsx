// src/pages/Chatbot.jsx
import React, { useState } from "react";
import apiClient from "../api/axiosClient";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await apiClient.post("/chatbot/chat", {
        message: userMsg.text,
      });

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: res.data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "❌ Failed to get response from AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">🤖 AI Chatbot</h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-slate-900 rounded p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded max-w-[80%] ${
              msg.role === "user"
                ? "bg-indigo-600 ml-auto"
                : "bg-slate-800 mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && <p className="text-gray-400">AI is thinking...</p>}
      </div>

      {/* Input */}
      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 px-3 py-2 rounded bg-slate-800 border border-slate-700"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-indigo-600 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
