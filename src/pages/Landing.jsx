// src/pages/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const pageStyle = {
    minHeight: "100vh",
    margin: 0,
    padding: "60px 16px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    background: "radial-gradient(circle at top, #1d3557 0, #020617 55%)",
    color: "#e5e7eb",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  };

  const containerStyle = {
    width: "100%",
    maxWidth: "960px",
    display: "flex",
    flexDirection: "column",
    gap: "48px",
  };

  const heroStyle = {
    textAlign: "center",
    animation: "fadeInDown 0.8s ease-out",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: 800,
    letterSpacing: "0.04em",
    marginBottom: "12px",
    textShadow: "0 0 24px rgba(56,189,248,0.45)",
  };

  const subtitleStyle = {
    fontSize: "1.05rem",
    maxWidth: "560px",
    margin: "0 auto",
    color: "#9ca3af",
    lineHeight: 1.6,
  };

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 12px",
    borderRadius: "999px",
    background: "rgba(15,23,42,0.8)",
    border: "1px solid rgba(56,189,248,0.5)",
    color: "#67e8f9",
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    marginBottom: "18px",
    boxShadow: "0 0 24px rgba(56,189,248,0.3)",
  };

  const pulseDotStyle = {
    width: "8px",
    height: "8px",
    borderRadius: "999px",
    backgroundColor: "#22c55e",
    boxShadow: "0 0 12px rgba(34,197,94,0.9)",
    animation: "pulse 1.3s infinite",
  };

  const featuresGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  };

  return (
    <>
      {/* keyframes injection */}
      <style>
        {`
          @keyframes fadeInDown {
            0% { opacity: 0; transform: translateY(-16px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(16px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes floatCard {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes glow {
            0%,100% { box-shadow: 0 0 0 rgba(56,189,248,0.0); }
            50% { box-shadow: 0 0 32px rgba(56,189,248,0.35); }
          }
          @keyframes pulse {
            0%,100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.25); opacity: 0.55; }
          }
          @keyframes starsMove {
            0% { background-position: 0 0; }
            100% { background-position: -400px -200px; }
          }
          .stars-bg {
            position: fixed;
            inset: 0;
            pointer-events: none;
            background-image:
              radial-gradient(1px 1px at 10% 20%, rgba(248,250,252,0.8) 0, transparent 55%),
              radial-gradient(1px 1px at 80% 30%, rgba(56,189,248,0.9) 0, transparent 55%),
              radial-gradient(1px 1px at 20% 80%, rgba(129,140,248,0.8) 0, transparent 55%);
            background-size: 260px 260px;
            opacity: 0.45;
            animation: starsMove 60s linear infinite;
            z-index: -1;
          }
        `}
      </style>

      <div style={pageStyle}>
        <div className="stars-bg" />
        <div style={containerStyle}>
          {/* Hero */}
          <div style={heroStyle}>
            <div style={badgeStyle}>
              <span style={pulseDotStyle} />
              <span>Autonomous dev co‑pilot</span>
            </div>
            <h1 style={titleStyle}>🚀 AUTOMEND AI</h1>
            <p style={subtitleStyle}>
              Autonomous AI system for running, debugging, explaining, and testing your real projects
              with a single click.
            </p>
          </div>

          {/* Features */}
          <div style={{ ...featuresGridStyle, animation: "fadeInUp 0.9s ease-out" }}>
            <Feature
              title="🤖 AI Chatbot"
              desc="Ask deep coding questions with context from your own codebase."
              onClick={() => navigate("/chatbot")}
              delay={0}
            />
            <Feature
              title="⚙️ AI Runner"
              desc="Run your project in a safe sandbox, auto-fix errors, and download the patch."
              onClick={() => navigate("/runner")}
              delay={0.08}
            />
            <Feature
              title="📘 Project Explainer"
              desc="Get instant architecture and file-level explanations for any repo."
              onClick={() => navigate("/explainer")}
              delay={0.16}
            />
            <Feature
              title="🧪 Test Generator"
              desc="Generate meaningful unit and integration tests tailored to your stack."
              onClick={() => navigate("/testgen")}
              delay={0.24}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Feature = ({ title, desc, onClick, delay = 0 }) => {
  const cardStyle = {
    position: "relative",
    cursor: "pointer",
    padding: "20px 18px",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.9))",
    border: "1px solid rgba(51,65,85,0.9)",
    color: "#e5e7eb",
    overflow: "hidden",
    transition: "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
    animation: `floatCard 6s ease-in-out ${delay}s infinite`,
  };

  const hoverShadow = "0 18px 40px rgba(15,23,42,0.9)";

  const titleStyle = {
    fontSize: "1.1rem",
    fontWeight: 600,
    marginBottom: "6px",
  };

  const descStyle = {
    fontSize: "0.9rem",
    color: "#9ca3af",
    lineHeight: 1.5,
    marginBottom: "10px",
  };

  const pillStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "0.7rem",
    color: "#a5f3fc",
    background: "rgba(15,23,42,0.9)",
    border: "1px solid rgba(8,145,178,0.9)",
    animation: "glow 3.8s ease-in-out infinite",
  };

  const arrowStyle = {
    fontSize: "0.85rem",
    transition: "transform 0.2s ease",
  };

  // simple JS hover effect to modify transform/shadow
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.boxShadow = hoverShadow;
    e.currentTarget.style.borderColor = "rgba(56,189,248,0.9)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.borderColor = "rgba(51,65,85,0.9)";
  };

  const handleArrowEnter = (e) => {
    const arrow = e.currentTarget.querySelector("[data-arrow]");
    if (arrow) arrow.style.transform = "translateX(4px)";
  };

  const handleArrowLeave = (e) => {
    const arrow = e.currentTarget.querySelector("[data-arrow]");
    if (arrow) arrow.style.transform = "translateX(0)";
  };

  return (
    <div
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleArrowEnter}
      onMouseOut={handleArrowLeave}
    >
      <div
        style={{
          position: "absolute",
          inset: "-40%",
          background:
            "radial-gradient(circle at 0 0, rgba(56,189,248,0.18), transparent 55%)",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>
        <h3 style={titleStyle}>{title}</h3>
        <p style={descStyle}>{desc}</p>
        <div style={pillStyle}>
          <span>Open tool</span>
          <span data-arrow style={arrowStyle}>
            ↗
          </span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
