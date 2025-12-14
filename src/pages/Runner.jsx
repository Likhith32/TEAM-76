// src/pages/Runner.jsx
import React from "react";
import useUpload from "../hooks/useUpload";
import useExecution from "../hooks/useExecution";
import { validateUpload } from "../utils/validators";

const Runner = () => {
  const {
    file,
    githubUrl,
    onFileChange,
    onGithubUrlChange,
    buildFormData,
  } = useUpload();

  const {
    execution,
    status,
    startExecution,
    resetExecution,
  } = useExecution();

  const runProject = () => {
    const error = validateUpload({ file, githubUrl });
    if (error) return alert(error);

    startExecution(buildFormData());
  };

  const runWithWrapper = () => {
    const formData = buildFormData();
    formData.append("run_mode", "wrapper");
    startExecution(formData);
  };

  const pageStyle = {
    maxWidth: "1040px",
    margin: "24px auto 40px auto",
    padding: "16px",
    boxSizing: "border-box",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#e5e7eb",
  };

  const headerStyle = {
    marginBottom: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  const titleRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const titleStyle = {
    fontSize: "1.6rem",
    fontWeight: 800,
    letterSpacing: "0.02em",
  };

  const badgeStyle = {
    fontSize: "0.7rem",
    padding: "4px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(52,211,153,0.6)",
    background: "rgba(15,23,42,0.9)",
    color: "#bbf7d0",
  };

  const subtitleStyle = {
    fontSize: "0.8rem",
    color: "#9ca3af",
  };

  const cardStyle = {
    borderRadius: "22px",
    border: "1px solid rgba(148,163,184,0.35)",
    background: "rgba(15,23,42,0.9)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    boxShadow: "0 22px 55px rgba(15,23,42,0.95)",
    padding: "18px 18px 18px 18px",
    marginBottom: "16px",
    position: "relative",
  };

  const outlineStyle = {
    position: "absolute",
    inset: "-30%",
    background:
      "radial-gradient(circle at 0 0, rgba(52,211,153,0.20), transparent 60%)," +
      "radial-gradient(circle at 100% 100%, rgba(59,130,246,0.18), transparent 55%)",
    opacity: 0.8,
    pointerEvents: "none",
  };

  const cardInnerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const labelStyle = {
    fontSize: "0.78rem",
    color: "#9ca3af",
    marginBottom: "2px",
  };

  const fileInputStyle = {
    fontSize: "0.8rem",
    color: "#e5e7eb",
  };

  const textInputStyle = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(51,65,85,0.9)",
    background: "rgba(15,23,42,0.95)",
    color: "#e5e7eb",
    fontSize: "0.82rem",
    outline: "none",
  };

  const buttonRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "4px",
  };

  const primaryButtonStyle = {
    padding: "8px 14px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "#022c22",
    fontWeight: 600,
    fontSize: "0.82rem",
    boxShadow: "0 12px 30px rgba(16,185,129,0.65)",
    transition: "transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease",
  };

  const secondaryButtonStyle = {
    padding: "8px 14px",
    borderRadius: "999px",
    border: "1px solid rgba(75,85,99,0.9)",
    cursor: "pointer",
    background: "rgba(31,41,55,0.95)",
    color: "#e5e7eb",
    fontWeight: 500,
    fontSize: "0.82rem",
    boxShadow: "0 8px 22px rgba(15,23,42,0.9)",
    transition: "transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease",
  };

  const hintStyle = {
    fontSize: "0.7rem",
    color: "#9ca3af",
  };

  const statusTextStyle = {
    fontSize: "0.8rem",
    marginBottom: "4px",
  };

  const statusValueStyle = {
    textTransform: "capitalize",
    color: "#a5b4fc",
  };

  const sectionTitleStyle = {
    fontSize: "0.9rem",
    fontWeight: 600,
    marginBottom: "4px",
  };

  const outputBoxStyle = {
    fontSize: "0.8rem",
    whiteSpace: "pre-wrap",
    background: "rgba(15,23,42,1)",
    borderRadius: "14px",
    padding: "10px 11px",
    border: "1px solid rgba(55,65,81,0.95)",
    color: "#c4f2d0",
  };

  const errorBoxStyle = {
    ...outputBoxStyle,
    color: "#fecaca",
    borderColor: "rgba(239,68,68,0.85)",
  };

  const listStyle = {
    fontSize: "0.8rem",
    marginLeft: "16px",
    marginTop: "4px",
  };

  const successTextStyle = {
    fontSize: "0.8rem",
    color: "#4ade80",
    marginTop: "6px",
  };

  const wrapperBoxStyle = {
    marginTop: "8px",
    borderRadius: "14px",
    padding: "10px 11px",
    border: "1px solid rgba(234,179,8,0.8)",
    background: "rgba(88,28,135,0.2)",
    color: "#fde68a",
    fontSize: "0.8rem",
  };

  const wrapperButtonStyle = {
    marginTop: "8px",
    padding: "7px 12px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #6366f1, #22d3ee)",
    color: "#0b1120",
    fontWeight: 600,
    fontSize: "0.8rem",
    boxShadow: "0 10px 26px rgba(79,70,229,0.75)",
    transition: "transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease",
  };

  const hoverIn = (e) => {
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.boxShadow = "0 16px 38px rgba(16,185,129,0.85)";
    e.currentTarget.style.filter = "brightness(1.05)";
  };

  const hoverOut = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 12px 30px rgba(16,185,129,0.65)";
    e.currentTarget.style.filter = "none";
  };

  const hoverSecondaryIn = (e) => {
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.boxShadow = "0 12px 30px rgba(15,23,42,0.95)";
    e.currentTarget.style.filter = "brightness(1.05)";
  };

  const hoverSecondaryOut = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 8px 22px rgba(15,23,42,0.9)";
    e.currentTarget.style.filter = "none";
  };

  const hoverWrapperIn = (e) => {
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.boxShadow = "0 14px 32px rgba(79,70,229,0.9)";
    e.currentTarget.style.filter = "brightness(1.05)";
  };

  const hoverWrapperOut = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 10px 26px rgba(79,70,229,0.75)";
    e.currentTarget.style.filter = "none";
  };

  return (
    <>
      <style>
        {`
          @keyframes runnerFloat {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          .runner-card-animated {
            animation: runnerFloat 16s ease-in-out infinite;
          }
        `}
      </style>

      <div style={pageStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={titleRowStyle}>
            <h1 style={titleStyle}>⚙️ AI Runner</h1>
            <span style={badgeStyle}>Run & auto‑debug your project</span>
          </div>
          <p style={subtitleStyle}>
            Upload a repo or GitHub URL, execute it in a sandbox, and let AI fix runtime errors.
          </p>
        </div>

        {/* Upload Section */}
        <section style={{ ...cardStyle }}>
          <div style={outlineStyle} />
          <div style={{ ...cardInnerStyle }} className="runner-card-animated">
            <div>
              <p style={labelStyle}>Upload project archive (.zip)</p>
              <input
                type="file"
                accept=".zip"
                onChange={onFileChange}
                style={fileInputStyle}
              />
            </div>

            <div>
              <p style={labelStyle}>Or paste GitHub repository URL</p>
              <input
                type="text"
                placeholder="https://github.com/user/repo"
                value={githubUrl}
                onChange={onGithubUrlChange}
                style={textInputStyle}
              />
            </div>

            <div style={buttonRowStyle}>
              <button
                type="button"
                onClick={runProject}
                style={primaryButtonStyle}
                onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
              >
                Run Project ▶
              </button>

              <button
                type="button"
                onClick={resetExecution}
                style={secondaryButtonStyle}
                onMouseEnter={hoverSecondaryIn}
                onMouseLeave={hoverSecondaryOut}
              >
                Reset
              </button>

              <span style={hintStyle}>
                Entry file detection: <code>main.py</code> or <code>app.py</code>.
              </span>
            </div>
          </div>
        </section>

        {/* Status Section */}
        <section style={cardStyle}>
          <div style={cardInnerStyle}>
            <p style={statusTextStyle}>
              <strong>Status:</strong>{" "}
              <span style={statusValueStyle}>{status}</span>
            </p>

            {/* 🚫 Not Executable */}
            {execution?.status === "not_executable" && (
              <div style={wrapperBoxStyle}>
                <p style={{ fontWeight: 600, marginBottom: "2px" }}>
                  🧠 Library-style Python project detected
                </p>
                <p>
                  This project has no detected entry file (<code>app.py</code> or{" "}
                  <code>main.py</code>).
                </p>
                <p style={{ marginTop: "4px", color: "#e5e7eb", fontSize: "0.78rem" }}>
                  You can still run it using an AI‑generated execution wrapper.
                </p>
                <button
                  type="button"
                  onClick={runWithWrapper}
                  style={wrapperButtonStyle}
                  onMouseEnter={hoverWrapperIn}
                  onMouseLeave={hoverWrapperOut}
                >
                  ▶ Run with AI Wrapper
                </button>
              </div>
            )}

            {/* ✅ Output */}
            {execution?.output && (
              <div>
                <h3 style={{ ...sectionTitleStyle, color: "#4ade80" }}>Output</h3>
                <pre style={outputBoxStyle}>{execution.output}</pre>
              </div>
            )}

            {/* 🛠 Fixes Applied */}
            {Array.isArray(execution?.fixes) && execution.fixes.length > 0 && (
              <div>
                <h3 style={{ ...sectionTitleStyle, color: "#60a5fa" }}>Fixes Applied</h3>
                <ul style={listStyle}>
                  {execution.fixes.map((fix, i) => (
                    <li key={i}>{fix.explanation}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ❌ Final Error */}
            {execution?.last_error && (
              <div>
                <h3 style={{ ...sectionTitleStyle, color: "#fb7185" }}>Final Error</h3>
                <pre style={errorBoxStyle}>{execution.last_error}</pre>
              </div>
            )}

            {/* 🎉 Success Messages */}
            {(status === "success" ||
              status === "fixed" ||
              status === "wrapper_executed") &&
              !execution?.last_error && (
                <p style={successTextStyle}>
                  ✅ Project executed successfully
                </p>
              )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Runner;
