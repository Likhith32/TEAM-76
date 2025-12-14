// src/pages/TestGenerator.jsx
import React, { useState } from "react";
import useUpload from "../hooks/useUpload";
import apiClient from "../api/axiosClient";

const TestGenerator = () => {
  const { file, githubUrl, onFileChange, onGithubUrlChange, buildFormData } =
    useUpload();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const generateTests = async () => {
    setError(null);
    setResult(null);

    try {
      setLoading(true);
      const formData = buildFormData();

      const res = await apiClient.post(
        "/testgen/generate",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(res.data);
    } catch (err) {
      setError("Failed to generate tests");
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    maxWidth: "960px",
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
    gap: "8px",
  };

  const titleStyle = {
    fontSize: "1.4rem",
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
    padding: "18px 18px 20px 18px",
    marginBottom: "16px",
    position: "relative",
  };

  const outlineStyle = {
    position: "absolute",
    inset: "-30%",
    background:
      "radial-gradient(circle at 0 0, rgba(52,211,153,0.20), transparent 60%)," +
      "radial-gradient(circle at 100% 100%, rgba(129,140,248,0.18), transparent 55%)",
    opacity: 0.8,
    pointerEvents: "none",
  };

  const cardInnerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const inputGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
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
    marginTop: "6px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  };

  const primaryButtonStyle = {
    padding: "8px 14px",
    borderRadius: "999px",
    border: "none",
    cursor: loading ? "default" : "pointer",
    background: loading
      ? "rgba(52,211,153,0.6)"
      : "linear-gradient(135deg, #22c55e, #14b8a6)",
    color: "#022c22",
    fontWeight: 600,
    fontSize: "0.82rem",
    boxShadow: "0 12px 30px rgba(16,185,129,0.65)",
    transition: "transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease",
    opacity: loading ? 0.7 : 1,
  };

  const hintStyle = {
    fontSize: "0.7rem",
    color: "#9ca3af",
  };

  const errorStyle = {
    marginTop: "8px",
    fontSize: "0.82rem",
    color: "#fecaca",
  };

  const resultCardStyle = {
    ...cardStyle,
    paddingTop: "16px",
  };

  const metaTextStyle = {
    fontSize: "0.82rem",
    marginBottom: "4px",
  };

  const warningTextStyle = {
    fontSize: "0.8rem",
    color: "#facc15",
    marginTop: "4px",
  };

  const testsTitleStyle = {
    fontSize: "0.9rem",
    fontWeight: 600,
    marginTop: "10px",
    marginBottom: "4px",
  };

  const testBlockStyle = {
    fontSize: "0.8rem",
    whiteSpace: "pre-wrap",
    background: "rgba(15,23,42,1)",
    borderRadius: "14px",
    padding: "10px 11px",
    border: "1px solid rgba(55,65,81,0.95)",
    color: "#e5e7eb",
    marginTop: "6px",
  };

  const downloadButtonStyle = {
    marginTop: "10px",
    padding: "8px 14px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #6366f1, #22d3ee)",
    color: "#0b1120",
    fontWeight: 600,
    fontSize: "0.82rem",
    boxShadow: "0 12px 32px rgba(79,70,229,0.8)",
    transition: "transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease",
  };

  const buttonHoverIn = (e) => {
    if (loading) return;
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.boxShadow = "0 16px 38px rgba(16,185,129,0.85)";
    e.currentTarget.style.filter = "brightness(1.05)";
  };

  const buttonHoverOut = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 12px 30px rgba(16,185,129,0.65)";
    e.currentTarget.style.filter = "none";
  };

  const downloadHoverIn = (e) => {
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.boxShadow = "0 16px 40px rgba(79,70,229,0.95)";
    e.currentTarget.style.filter = "brightness(1.05)";
  };

  const downloadHoverOut = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 12px 32px rgba(79,70,229,0.8)";
    e.currentTarget.style.filter = "none";
  };

  return (
    <>
      <style>
        {`
          @keyframes testCardFloat {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          .testgen-card-animated {
            animation: testCardFloat 14s ease-in-out infinite;
          }
        `}
      </style>

      <div style={pageStyle}>
        <div style={headerStyle}>
          <div style={titleRowStyle}>
            <h1 style={titleStyle}>🧪 Test Generator</h1>
            <span style={badgeStyle}>Auto-generate unit tests</span>
          </div>
          <p style={subtitleStyle}>
            Upload a project or GitHub URL and let AI generate language-appropriate test files.
          </p>
        </div>

        {/* Upload */}
        <section style={cardStyle}>
          <div style={outlineStyle} />
          <div style={cardInnerStyle} className="testgen-card-animated">
            <div style={inputGroupStyle}>
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
                  onClick={generateTests}
                  disabled={loading}
                  style={primaryButtonStyle}
                  onMouseEnter={buttonHoverIn}
                  onMouseLeave={buttonHoverOut}
                >
                  {loading ? "Generating…" : "Generate Tests ↗"}
                </button>
                <span style={hintStyle}>
                  Tests are generated based on the detected framework and file layout.
                </span>
              </div>

              {error && <p style={errorStyle}>{error}</p>}
            </div>
          </div>
        </section>

        {/* Result */}
        {result && (
          <section style={resultCardStyle}>
            <div style={cardInnerStyle}>
              <p style={metaTextStyle}>
                <strong>Framework:</strong> {result.framework || "N/A"}
              </p>
              <p style={metaTextStyle}>
                <strong>Status:</strong> {result.status || "unknown"}
              </p>

              {/* Warning UI */}
              {result.status === "warning" && (
                <div style={warningTextStyle}>
                  ⚠️ {result.message}
                </div>
              )}

              {/* Success UI */}
              {result.status === "success" && result.tests && (
                <>
                  <h3 style={testsTitleStyle}>Generated Tests</h3>

                  {Object.entries(result.tests).map(([file, code]) => (
                    <pre key={file} style={testBlockStyle}>
                      <strong>{file}</strong>
                      {"\n\n"}
                      {code}
                    </pre>
                  ))}

                  {result.zip_path && (
                    <button
                      type="button"
                      onClick={() => {
                        window.open(
                          `/api/testgen/download?path=${encodeURIComponent(
                            result.zip_path
                          )}`,
                          "_blank"
                        );
                      }}
                      style={downloadButtonStyle}
                      onMouseEnter={downloadHoverIn}
                      onMouseLeave={downloadHoverOut}
                    >
                      ⬇️ Download Tests ZIP
                    </button>
                  )}
                </>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default TestGenerator;
