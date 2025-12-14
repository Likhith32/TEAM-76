// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  const footerStyle = {
    marginTop: "32px",
    padding: "10px 16px 14px 16px",
    boxSizing: "border-box",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#9ca3af",
  };

  const barStyle = {
    maxWidth: "1040px",
    margin: "0 auto",
    borderRadius: "18px",
    padding: "8px 14px",
    border: "1px solid rgba(148,163,184,0.35)",
    background: "rgba(15,23,42,0.9)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    boxShadow: "0 14px 40px rgba(15,23,42,0.95)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    fontSize: "0.75rem",
  };

  const leftStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  const dotStyle = {
    width: "7px",
    height: "7px",
    borderRadius: "999px",
    background:
      "radial-gradient(circle at 30% 30%, #22c55e, #16a34a)",
    boxShadow: "0 0 10px rgba(34,197,94,0.9)",
  };

  const rightStyle = {
    fontSize: "0.72rem",
    color: "#6b7280",
    textAlign: "right",
  };

  const year = new Date().getFullYear();

  return (
    <>
      <style>
        {`
          @keyframes footerPulse {
            0%,100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.6; }
          }
          .footer-dot-animated {
            animation: footerPulse 1.6s infinite;
          }
        `}
      </style>

      <footer style={footerStyle}>
        <div style={barStyle}>
          <div style={leftStyle}>
            <span className="footer-dot-animated" style={dotStyle} />
            <span>
              © {year} AUTOMEND AI · Autonomous Code Debugging Platform
            </span>
          </div>
          <div style={rightStyle}>
            <span>Made for real-world repos &nbsp;·&nbsp; v1.0</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
