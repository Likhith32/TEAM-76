// src/pages/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import apiClient from "../api/axiosClient";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await apiClient.post("/chatbot/chat", {
        message: userMsg.text,
      });

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: res.data.reply || "AI sent an empty response." },
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const pageStyle = {
    minHeight: "80vh",
    maxWidth: "960px",
    margin: "24px auto",
    padding: "16px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#e5e7eb",
    position: "relative",
  };

  const headerStyle = {
    marginBottom: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const titleStyle = {
    fontSize: "1.4rem",
    fontWeight: 700,
    letterSpacing: "0.03em",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const badgeStyle = {
    fontSize: "0.7rem",
    padding: "4px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(56,189,248,0.6)",
    background: "rgba(15,23,42,0.9)",
    color: "#a5f3fc",
  };

  const cardStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    borderRadius: "22px",
    border: "1px solid rgba(148,163,184,0.35)",
    background: "rgba(15,23,42,0.85)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    boxShadow: "0 22px 55px rgba(15,23,42,0.95)",
    overflow: "hidden",
    position: "relative",
  };

  const messagesStyle = {
    flex: 1,
    padding: "14px 16px 10px 16px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  const inputBarOuterStyle = {
    borderTop: "1px solid rgba(51,65,85,0.9)",
    padding: "8px 10px",
    background: "rgba(15,23,42,0.95)",
  };

  const inputBarStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const inputStyle = {
    flex: 1,
    padding: "8px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(51,65,85,0.9)",
    background: "rgba(15,23,42,0.9)",
    color: "#e5e7eb",
    fontSize: "0.85rem",
    outline: "none",
  };

  const buttonStyle = {
    padding: "8px 14px",
    borderRadius: "999px",
    border: "none",
    cursor: loading ? "default" : "pointer",
    background:
      loading
        ? "rgba(148,163,184,0.7)"
        : "linear-gradient(135deg, #22d3ee, #6366f1)",
    color: "#0b1120",
    fontWeight: 600,
    fontSize: "0.82rem",
    boxShadow: "0 12px 30px rgba(59,130,246,0.65)",
    transition: "transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease",
  };

  const typingRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.75rem",
    color: "#9ca3af",
    marginTop: "4px",
  };

  const typingDotBase = {
    width: "6px",
    height: "6px",
    borderRadius: "999px",
    backgroundColor: "#38bdf8",
    opacity: 0.6,
  };

  const handleButtonEnter = (e) => {
    if (loading) return;
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.boxShadow = "0 16px 38px rgba(59,130,246,0.85)";
    e.currentTarget.style.filter = "brightness(1.05)";
  };

  const handleButtonLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 12px 30px rgba(59,130,246,0.65)";
    e.currentTarget.style.filter = "none";
  };

  const bubbleBase = {
    maxWidth: "80%",
    padding: "8px 11px",
    borderRadius: "18px",
    fontSize: "0.85rem",
    lineHeight: 1.5,
    wordBreak: "break-word",
    boxShadow: "0 10px 26px rgba(15,23,42,0.85)",
    position: "relative",
    animation: "fadeInUp 0.25s ease-out",
  };

  const userBubble = {
    ...bubbleBase,
    alignSelf: "flex-end",
    borderBottomRightRadius: "4px",
    background:
      "radial-gradient(circle at 0 0, rgba(56,189,248,0.5), transparent 55%), linear-gradient(135deg, #4f46e5, #22d3ee)",
    color: "#e5e7eb",
  };

  const aiBubble = {
    ...bubbleBase,
    alignSelf: "flex-start",
    borderBottomLeftRadius: "4px",
    background: "rgba(15,23,42,0.98)",
    border: "1px solid rgba(51,65,85,0.9)",
    color: "#e5e7eb",
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes particleDrift {
            0% { background-position: 0 0; }
            100% { background-position: -420px -260px; }
          }
          @keyframes typingDot {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
            30% { transform: translateY(-3px); opacity: 1; }
          }
          .chat-particles {
            position: absolute;
            inset: 0;
            pointer-events: none;
            background-image:
              radial-gradient(1px 1px at 10% 20%, rgba(248,250,252,0.8) 0, transparent 55%),
              radial-gradient(1px 1px at 80% 30%, rgba(56,189,248,0.8) 0, transparent 55%),
              radial-gradient(1px 1px at 20% 80%, rgba(129,140,248,0.85) 0, transparent 55%);
            background-size: 260px 260px;
            opacity: 0.45;
            animation: particleDrift 70s linear infinite;
          }
          .typing-dot-1 { animation: typingDot 1.1s infinite; }
          .typing-dot-2 { animation: typingDot 1.1s infinite 0.18s; }
          .typing-dot-3 { animation: typingDot 1.1s infinite 0.36s; }
          .chat-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .chat-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .chat-scroll::-webkit-scrollbar-thumb {
            background: rgba(148,163,184,0.6);
            border-radius: 999px;
          }
        `}
      </style>

      <div style={pageStyle}>
        <div className="chat-particles" />
        <div style={headerStyle}>
          <div style={titleStyle}>
            <span>🤖 Automend Chat</span>
            <span style={badgeStyle}>AI assistant for your code</span>
          </div>
          <span style={{ fontSize: "0.7rem", color: "#9ca3af" }}>
            Press Enter to send · Works with your backend /chat endpoint
          </span>
        </div>

        <section style={cardStyle}>
          {/* messages */}
          <div style={messagesStyle} className="chat-scroll">
            {messages.length === 0 && !loading && (
              <div
                style={{
                  margin: "auto",
                  textAlign: "center",
                  fontSize: "0.85rem",
                  color: "#9ca3af",
                }}
              >
                <p>Start a conversation with Automend AI.</p>
                <p style={{ fontSize: "0.78rem", marginTop: "4px" }}>
                  Try: “Debug this stack trace” or “Explain this function.”
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                style={msg.role === "user" ? userBubble : aiBubble}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div style={{ ...aiBubble, maxWidth: "120px" }}>
                <div style={typingRowStyle}>
                  <span>AI is thinking</span>
                  <span
                    className="typing-dot-1"
                    style={{ ...typingDotBase }}
                  />
                  <span
                    className="typing-dot-2"
                    style={{ ...typingDotBase }}
                  />
                  <span
                    className="typing-dot-3"
                    style={{ ...typingDotBase }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* input */}
          <div style={inputBarOuterStyle}>
            <div style={inputBarStyle}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something about your code, errors, or architecture…"
                style={inputStyle}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                style={{
                  ...buttonStyle,
                  opacity: loading || !input.trim() ? 0.6 : 1,
                }}
                onMouseEnter={handleButtonEnter}
                onMouseLeave={handleButtonLeave}
              >
                {loading ? "Sending…" : "Send ↗"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Chatbot;
