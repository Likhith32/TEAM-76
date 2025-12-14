// src/components/DiffViewer.jsx
import React from "react";

/**
 * Props:
 * - original: string
 * - modified: string
 */
const DiffViewer = ({ original = "", modified = "" }) => {
  const wrapperStyle = {
    borderRadius: "22px",
    border: "1px solid rgba(148,163,184,0.35)",
    background: "rgba(15,23,42,0.95)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    boxShadow: "0 22px 55px rgba(15,23,42,0.95)",
    padding: "14px 14px 16px 14px",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#e5e7eb",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  };

  const columnStyle = {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  };

  const titleRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "6px",
  };

  const titleStyle = {
    fontSize: "0.9rem",
    fontWeight: 600,
  };

  const chipStyle = (type) => ({
    fontSize: "0.7rem",
    padding: "2px 8px",
    borderRadius: "999px",
    border:
      type === "original"
        ? "1px solid rgba(248,250,252,0.4)"
        : "1px solid rgba(52,211,153,0.7)",
    background:
      type === "original"
        ? "rgba(15,23,42,0.9)"
        : "rgba(22,163,74,0.15)",
    color: type === "original" ? "#e5e7eb" : "#bbf7d0",
  });

  const preStyle = {
    fontSize: "0.8rem",
    whiteSpace: "pre-wrap",
    background: "rgba(15,23,42,1)",
    borderRadius: "14px",
    padding: "10px 11px",
    border: "1px solid rgba(55,65,81,0.95)",
    maxHeight: "20rem",
    overflow: "auto",
    fontFamily:
      "JetBrains Mono, Menlo, Monaco, Consolas, 'Courier New', monospace",
  };

  const placeholderStyle = {
    opacity: 0.5,
  };

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .diff-grid-responsive {
              grid-template-columns: 1fr;
            }
          }
          .diff-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .diff-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .diff-scroll::-webkit-scrollbar-thumb {
            background: rgba(148,163,184,0.6);
            border-radius: 999px;
          }
        `}
      </style>

      <div style={wrapperStyle}>
        <div
          className="diff-grid-responsive"
          style={gridStyle}
        >
          <div style={columnStyle}>
            <div style={titleRowStyle}>
              <h3 style={titleStyle}>Original</h3>
              <span style={chipStyle("original")}>Before</span>
            </div>
            <pre style={preStyle} className="diff-scroll">
              {original ? (
                original
              ) : (
                <span style={placeholderStyle}>— no original content —</span>
              )}
            </pre>
          </div>

          <div style={columnStyle}>
            <div style={titleRowStyle}>
              <h3 style={titleStyle}>Modified</h3>
              <span style={chipStyle("modified")}>After</span>
            </div>
            <pre style={preStyle} className="diff-scroll">
              {modified ? (
                modified
              ) : (
                <span style={placeholderStyle}>— no modified content —</span>
              )}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiffViewer;
