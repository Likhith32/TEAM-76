// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  const navOuterStyle = {
    position: "sticky",
    top: 0,
    zIndex: 40,
    padding: "12px 16px 0 16px",
    boxSizing: "border-box",
  };

  const navInnerStyle = {
    maxWidth: "960px",
    margin: "0 auto",
  };

  const glassStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "10px 14px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(15,23,42,0.70)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    boxShadow: "0 18px 45px rgba(15,23,42,0.95)",
  };

  const logoWrapStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  };

  const logoIconStyle = {
    height: "32px",
    width: "32px",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg, #22d3ee, #38bdf8, #6366f1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 18px rgba(56,189,248,0.6)",
  };

  const logoLetterStyle = {
    fontSize: "0.9rem",
    fontWeight: 800,
    color: "#020617",
  };

  const logoTextBoxStyle = {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.1,
  };

  const logoTopStyle = {
    fontSize: "0.68rem",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: "#e5e7eb",
  };

  const logoBottomStyle = {
    fontSize: "0.65rem",
    color: "#9ca3af",
  };

  const linksWrapStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 6px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.35)",
    background: "rgba(15,23,42,0.85)",
  };

  const linkBaseStyle = {
    position: "relative",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "0.8rem",
    fontWeight: 500,
    color: "#e5e7eb",
    textDecoration: "none",
    transition: "color 0.2s ease",
  };

  const toggleButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.4)",
    background: "rgba(15,23,42,0.9)",
    color: "#e5e7eb",
    fontSize: "0.75rem",
    fontWeight: 500,
    cursor: "pointer",
    boxShadow: "0 8px 22px rgba(15,23,42,0.9)",
    transition: "border-color 0.2s ease, transform 0.2s ease",
  };

  const statusDotStyle = {
    width: "8px",
    height: "8px",
    borderRadius: "999px",
    backgroundColor: "#22c55e",
    boxShadow: "0 0 10px rgba(34,197,94,0.9)",
    animation: "pulse 1.3s infinite",
  };

  const handleToggleHoverIn = (e) => {
    e.currentTarget.style.borderColor = "rgba(56,189,248,0.9)";
    e.currentTarget.style.transform = "translateY(-1px)";
  };

  const handleToggleHoverOut = (e) => {
    e.currentTarget.style.borderColor = "rgba(148,163,184,0.4)";
    e.currentTarget.style.transform = "translateY(0)";
  };

  const getLinkStyle = ({ isActive }) => {
    const base = { ...linkBaseStyle };

    if (isActive) {
      base.color = "#67e8f9";
      base.fontWeight = 600;
    }

    return base;
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%,100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.6; }
          }
          .nav-link-underline::after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: 2px;
            width: 0;
            height: 2px;
            border-radius: 999px;
            background: linear-gradient(90deg, #22d3ee, #6366f1);
            transform: translateX(-50%);
            transition: width 0.25s ease;
          }
          .nav-link-underline:hover::after {
            width: 80%;
          }
          .nav-link-active::after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: 2px;
            width: 60%;
            height: 2px;
            border-radius: 999px;
            background: linear-gradient(90deg, #22d3ee, #6366f1);
            transform: translateX(-50%);
          }
        `}
      </style>

      <header style={navOuterStyle}>
        <div style={navInnerStyle}>
          <div style={glassStyle}>
            {/* Logo */}
            <div style={logoWrapStyle}>
              <div style={logoIconStyle}>
                <span style={logoLetterStyle}>A</span>
              </div>
              <div style={logoTextBoxStyle}>
                <span style={logoTopStyle}>Automend</span>
                <span style={logoBottomStyle}>AI Dev Copilot</span>
              </div>
            </div>

            {/* Links */}
            <nav style={linksWrapStyle}>
              <NavLink to="/" style={getLinkStyle}>
                {({ isActive }) => (
                  <span
                    className={
                      "nav-link-underline" +
                      (isActive ? " nav-link-active" : "")
                    }
                  >
                    Home
                  </span>
                )}
              </NavLink>
              <NavLink to="/chatbot" style={getLinkStyle}>
                {({ isActive }) => (
                  <span
                    className={
                      "nav-link-underline" +
                      (isActive ? " nav-link-active" : "")
                    }
                  >
                    Chatbot
                  </span>
                )}
              </NavLink>
              <NavLink to="/runner" style={getLinkStyle}>
                {({ isActive }) => (
                  <span
                    className={
                      "nav-link-underline" +
                      (isActive ? " nav-link-active" : "")
                    }
                  >
                    Runner
                  </span>
                )}
              </NavLink>
              <NavLink to="/explainer" style={getLinkStyle}>
                {({ isActive }) => (
                  <span
                    className={
                      "nav-link-underline" +
                      (isActive ? " nav-link-active" : "")
                    }
                  >
                    Explainer
                  </span>
                )}
              </NavLink>
              <NavLink to="/testgen" style={getLinkStyle}>
                {({ isActive }) => (
                  <span
                    className={
                      "nav-link-underline" +
                      (isActive ? " nav-link-active" : "")
                    }
                  >
                    TestGen
                  </span>
                )}
              </NavLink>
            </nav>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              style={toggleButtonStyle}
              onMouseEnter={handleToggleHoverIn}
              onMouseLeave={handleToggleHoverOut}
              title="Toggle theme"
            >
              <span style={statusDotStyle} />
              <span style={{ display: "none" }}>
                {/* visible if you want text on larger screens via media queries */}
              </span>
              <span>{theme === "dark" ? "🌙" : "☀️"}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
