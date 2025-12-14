// src/components/UploadBox.jsx
import React from "react";
import { formatFileSize } from "../utils/fileHelpers";

/**
 * Props:
 * - file
 * - githubUrl
 * - onFileChange
 * - onGithubUrlChange
 */
const UploadBox = ({
  file,
  githubUrl,
  onFileChange,
  onGithubUrlChange,
}) => {
  const wrapperStyle = {
    borderRadius: "22px",
    border: "1px solid rgba(148,163,184,0.35)",
    background: "rgba(15,23,42,0.95)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    boxShadow: "0 20px 50px rgba(15,23,42,0.95)",
    padding: "16px 16px 18px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#e5e7eb",
    fontSize: "0.82rem",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "4px",
    fontWeight: 600,
    fontSize: "0.8rem",
  };

  const fileMetaStyle = {
    fontSize: "0.78rem",
    color: "#9ca3af",
    marginTop: "4px",
  };

  const dividerRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "4px",
    marginBottom: "4px",
    color: "#6b7280",
    fontSize: "0.76rem",
  };

  const dividerLineStyle = {
    height: "1px",
    flex: 1,
    background:
      "linear-gradient(90deg, rgba(51,65,85,0), rgba(148,163,184,0.6), rgba(51,65,85,0))",
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

  const fileLabelButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "7px 12px",
    borderRadius: "999px",
    border: "1px dashed rgba(148,163,184,0.8)",
    background: "rgba(15,23,42,0.95)",
    color: "#e5e7eb",
    fontSize: "0.78rem",
    cursor: "pointer",
    transition: "border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease",
    boxShadow: "0 10px 26px rgba(15,23,42,0.9)",
  };

  const iconStyle = {
    fontSize: "0.9rem",
  };

  const handleLabelEnter = (e) => {
    e.currentTarget.style.borderColor = "rgba(56,189,248,0.9)";
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.boxShadow = "0 14px 32px rgba(15,23,42,1)";
  };

  const handleLabelLeave = (e) => {
    e.currentTarget.style.borderColor = "rgba(148,163,184,0.8)";
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 10px 26px rgba(15,23,42,0.9)";
  };

  return (
    <>
      <style>
        {`
          .upload-hidden-input {
            display: none;
          }
        `}
      </style>

      <div style={wrapperStyle}>
        {/* Upload ZIP */}
        <div>
          <label style={labelStyle}>Upload ZIP</label>
          <label
            htmlFor="upload-zip-input"
            style={fileLabelButtonStyle}
            onMouseEnter={handleLabelEnter}
            onMouseLeave={handleLabelLeave}
          >
            <span style={iconStyle}>📦</span>
            <span>{file ? "Change file" : "Choose .zip file"}</span>
          </label>
          <input
            id="upload-zip-input"
            className="upload-hidden-input"
            type="file"
            accept=".zip"
            onChange={onFileChange}
          />
          {file && (
            <p style={fileMetaStyle}>
              {file.name} ({formatFileSize(file.size)})
            </p>
          )}
        </div>

        {/* Divider */}
        <div style={dividerRowStyle}>
          <span style={dividerLineStyle} />
          <span>OR</span>
          <span style={dividerLineStyle} />
        </div>

        {/* GitHub URL */}
        <div>
          <label style={labelStyle}>GitHub Repository URL</label>
          <input
            type="text"
            placeholder="https://github.com/user/repo"
            value={githubUrl}
            onChange={onGithubUrlChange}
            style={textInputStyle}
          />
        </div>
      </div>
    </>
  );
};

export default UploadBox;
