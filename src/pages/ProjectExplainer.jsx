// src/pages/ProjectExplainer.jsx
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import useUpload from "../hooks/useUpload";
import apiClient from "../api/axiosClient";

const ProjectExplainer = () => {
  const { githubUrl, onFileChange, onGithubUrlChange, buildFormData } =
    useUpload();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyzeProject = async () => {
    setError(null);
    setResult(null);

    try {
      setLoading(true);
      const formData = buildFormData();

      const res = await apiClient.post(
        "/explainer/analyze",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(res.data);
    } catch {
      setError("Failed to analyze project");
    } finally {
      setLoading(false);
    }
  };

  const explanation = result?.explanation;

  const pageStyle = {
    maxWidth: "960px",
    margin: "24px auto 40px auto",
    padding: "16px",
    boxSizing: "border-box",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#e5e7eb",
    position: "relative",
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
    gap: "8px",
  };

  const titleStyle = {
    fontSize: "1.4rem",
    fontWeight: 700,
    letterSpacing: "0.03em",
  };

  const subtitleStyle = {
    fontSize: "0.8rem",
    color: "#9ca3af",
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
    borderRadius: "22px",
    border: "1px solid rgba(148,163,184,0.35)",
    background: "rgba(15,23,42,0.9)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    boxShadow: "0 22px 55px rgba(15,23,42,0.95)",
    padding: "18px 18px 20px 18px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const inputRowStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  const sectionLabelStyle = {
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
    gap: "10px",
    marginTop: "6px",
  };

  const buttonStyle = {
    padding: "8px 14px",
    borderRadius: "999px",
    border: "none",
    cursor: loading ? "default" : "pointer",
    background: loading
      ? "rgba(148,163,184,0.7)"
      : "linear-gradient(135deg, #22d3ee, #6366f1)",
    color: "#0b1120",
    fontWeight: 600,
    fontSize: "0.82rem",
    boxShadow: "0 12px 30px rgba(59,130,246,0.65)",
    transition: "transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease",
  };

  const hintStyle = {
    fontSize: "0.7rem",
    color: "#9ca3af",
  };

  const metaRowStyle = {
    display: "flex",
    gap: "16px",
    fontSize: "0.8rem",
    color: "#e5e7eb",
  };

  const pillStyle = {
    padding: "4px 9px",
    borderRadius: "999px",
    background: "rgba(15,23,42,1)",
    border: "1px solid rgba(51,65,85,0.9)",
  };

  const sectionStyle = {
    marginTop: "12px",
    paddingTop: "10px",
    borderTop: "1px solid rgba(51,65,85,0.85)",
  };

  const sectionTitleStyle = {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#a5b4fc",
    marginBottom: "6px",
  };

  const markdownStyle = {
    fontSize: "0.86rem",
    lineHeight: 1.55,
    color: "#e5e7eb",
    whiteSpace: "pre-wrap",
  };

  const errorStyle = {
    marginTop: "10px",
    fontSize: "0.82rem",
    color: "#f97373",
  };

  const buttonHoverIn = (e) => {
    if (loading) return;
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.boxShadow = "0 16px 38px rgba(59,130,246,0.85)";
    e.currentTarget.style.filter = "brightness(1.05)";
  };

  const buttonHoverOut = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 12px 30px rgba(59,130,246,0.65)";
    e.currentTarget.style.filter = "none";
  };

  return (
    <>
      <style>
        {`
          @keyframes panelFloat {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          @keyframes subtleGlow {
            0%,100% { box-shadow: 0 0 0 rgba(56,189,248,0.0); }
            50% { box-shadow: 0 0 26px rgba(56,189,248,0.35); }
          }
          .explainer-outline {
            position: absolute;
            inset: -30%;
            background:
              radial-gradient(circle at 0 0, rgba(56,189,248,0.20), transparent 60%),
              radial-gradient(circle at 100% 100%, rgba(129,140,248,0.18), transparent 55%);
            opacity: 0.8;
            pointer-events: none;
          }
          .explainer-card {
            animation: panelFloat 12s ease-in-out infinite;
          }
        `}
      </style>

      <div style={pageStyle}>
        <div style={headerStyle}>
          <div style={titleRowStyle}>
            <h1 style={titleStyle}>📘 Project Explainer</h1>
            <span style={badgeStyle}>Upload repo or GitHub URL</span>
          </div>
          <p style={subtitleStyle}>
            Understand architecture, entry points, and tech stack of any project in seconds.
          </p>
        </div>

        <div style={{ position: "relative" }}>
          <div className="explainer-outline" />
          <div className="explainer-card" style={cardStyle}>
            {/* inputs */}
            <div style={inputRowStyle}>
              <div>
                <p style={sectionLabelStyle}>Upload project archive (.zip)</p>
                <input
                  type="file"
                  accept=".zip"
                  onChange={onFileChange}
                  style={fileInputStyle}
                />
              </div>

              <div>
                <p style={sectionLabelStyle}>Or paste GitHub repository URL</p>
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
                  onClick={analyzeProject}
                  disabled={loading}
                  style={{
                    ...buttonStyle,
                    opacity: loading ? 0.65 : 1,
                  }}
                  onMouseEnter={buttonHoverIn}
                  onMouseLeave={buttonHoverOut}
                >
                  {loading ? "Analyzing…" : "Explain Project ↗"}
                </button>
                <span style={hintStyle}>
                  Large repositories may take a bit longer to process.
                </span>
              </div>

              {error && <p style={errorStyle}>{error}</p>}
            </div>

            {/* result */}
            {result && (
              <div style={{ marginTop: "8px" }}>
                <div style={metaRowStyle}>
                  <span style={pillStyle}>
                    <strong>Language:</strong> {result.language || "Unknown"}
                  </span>
                  <span style={pillStyle}>
                    <strong>Framework:</strong> {result.framework || "Unknown"}
                  </span>
                </div>

                {explanation?.summary && (
                  <section style={sectionStyle}>
                    <h3 style={sectionTitleStyle}>📌 Project Summary</h3>
                    <div style={markdownStyle}>
                      <ReactMarkdown>{explanation.summary}</ReactMarkdown>
                    </div>
                  </section>
                )}

                {explanation?.architecture && (
                  <section style={sectionStyle}>
                    <h3 style={sectionTitleStyle}>🏗 Architecture</h3>
                    <div style={markdownStyle}>
                      <ReactMarkdown>{explanation.architecture}</ReactMarkdown>
                    </div>
                  </section>
                )}

                {explanation?.tech_stack && (
                  <section style={sectionStyle}>
                    <h3 style={sectionTitleStyle}>🧰 Tech Stack</h3>
                    <div style={markdownStyle}>
                      <ReactMarkdown>{explanation.tech_stack}</ReactMarkdown>
                    </div>
                  </section>
                )}

                {explanation?.entry_points && (
                  <section style={sectionStyle}>
                    <h3 style={sectionTitleStyle}>🚪 Entry Points</h3>
                    <div style={markdownStyle}>
                      <ReactMarkdown>{explanation.entry_points}</ReactMarkdown>
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectExplainer;
