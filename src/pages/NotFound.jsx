// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const pageStyle = {
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "24px 16px",
    boxSizing: "border-box",
    position: "relative",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#e5e7eb",
  };

  const cardStyle = {
    position: "relative",
    maxWidth: "420px",
    width: "100%",
    borderRadius: "24px",
    padding: "24px 20px 22px 20px",
    border: "1px solid rgba(148,163,184,0.45)",
    background: "rgba(15,23,42,0.9)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    boxShadow: "0 24px 60px rgba(15,23,42,0.95)",
  };

  const glowStyle = {
    position: "absolute",
    inset: "-35%",
    background:
      "radial-gradient(circle at 0 0, rgba(56,189,248,0.25), transparent 60%)," +
      "radial-gradient(circle at 100% 100%, rgba(129,140,248,0.22), transparent 55%)",
    opacity: 0.9,
    pointerEvents: "none",
  };

  const titleStyle = {
    fontSize: "3.3rem",
    fontWeight: 800,
    letterSpacing: "0.05em",
    marginBottom: "6px",
  };

  const subtitleStyle = {
    fontSize: "1rem",
    color: "#9ca3af",
    marginBottom: "12px",
  };

  const detailStyle = {
    fontSize: "0.8rem",
    color: "#94a3b8",
    marginBottom: "18px",
  };

  const pillStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(56,189,248,0.65)",
    background: "rgba(15,23,42,0.95)",
    color: "#a5f3fc",
    fontSize: "0.7rem",
    marginBottom: "10px",
  };

  const dotStyle = {
    width: "8px",
    height: "8px",
    borderRadius: "999px",
    backgroundColor: "#22c55e",
    boxShadow: "0 0 12px rgba(34,197,94,0.95)",
    animation: "nf-pulse 1.3s infinite",
  };

  const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "8px 16px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #22d3ee, #6366f1)",
    color: "#0b1120",
    fontWeight: 600,
    fontSize: "0.82rem",
    boxShadow: "0 14px 38px rgba(79,70,229,0.9)",
    textDecoration: "none",
    transition:
      "transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease",
  };

  const arrowStyle = {
    fontSize: "0.9rem",
    transition: "transform 0.18s ease",
  };

  const handleButtonEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.boxShadow = "0 18px 46px rgba(79,70,229,1)";
    e.currentTarget.style.filter = "brightness(1.05)";
    const arrow = e.currentTarget.querySelector("[data-arrow]");
    if (arrow) arrow.style.transform = "translateX(3px)";
  };

  const handleButtonLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 14px 38px rgba(79,70,229,0.9)";
    e.currentTarget.style.filter = "none";
    const arrow = e.currentTarget.querySelector("[data-arrow]");
    if (arrow) arrow.style.transform = "translateX(0)";
  };

  return (
    <>
      <style>
        {`
          @keyframes nf-pulse {
            0%,100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.25); opacity: 0.6; }
          }
          @keyframes nf-float {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          .nf-card-animated {
            animation: nf-float 18s ease-in-out infinite;
          }
        `}
      </style>

      <div style={pageStyle}>
        <div style={cardStyle} className="nf-card-animated">
          <div style={glowStyle} />
          <div style={{ position: "relative" }}>
            <div style={pillStyle}>
              <span style={dotStyle} />
              <span>Endpoint off the map</span>
            </div>

            <h1 style={titleStyle}>404</h1>
            <p style={subtitleStyle}>Page not found</p>
            <p style={detailStyle}>
              The route you tried to reach does not exist in Automend AI.
              It might be moved, renamed, or never created.
            </p>

            <Link
              to="/"
              style={buttonStyle}
              onMouseEnter={handleButtonEnter}
              onMouseLeave={handleButtonLeave}
            >
              <span>Go back home</span>
              <span data-arrow style={arrowStyle}>
                ↩
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
