// src/components/CodeEditor.jsx
import React from "react";
import Editor from "@monaco-editor/react";

/**
 * Props:
 * - value
 * - onChange
 * - language (python, java, javascript)
 */
const CodeEditor = ({
  value = "",
  onChange,
  language = "python",
}) => {
  const wrapperStyle = {
    position: "relative",
    borderRadius: "18px",
    padding: "10px",
    background: "rgba(15,23,42,0.95)",
    border: "1px solid rgba(148,163,184,0.45)",
    boxShadow: "0 20px 50px rgba(15,23,42,0.95)",
    overflow: "hidden",
  };

  const glowStyle = {
    position: "absolute",
    inset: "-40%",
    background:
      "radial-gradient(circle at 0 0, rgba(56,189,248,0.25), transparent 60%)," +
      "radial-gradient(circle at 100% 100%, rgba(129,140,248,0.2), transparent 55%)",
    opacity: 0.85,
    pointerEvents: "none",
  };

  const headerStyle = {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "6px",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#e5e7eb",
    fontSize: "0.78rem",
  };

  const langBadgeStyle = {
    padding: "3px 8px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.6)",
    background: "rgba(15,23,42,0.9)",
  };

  const statusDotStyle = {
    width: "7px",
    height: "7px",
    borderRadius: "999px",
    backgroundColor: "#22c55e",
    boxShadow: "0 0 10px rgba(34,197,94,0.9)",
    marginRight: "6px",
  };

  const statusStyle = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: "#9ca3af",
  };

  const handleChange = (val) => {
    if (onChange) onChange(val ?? "");
  };

  return (
    <>
      <style>
        {`
          .code-editor-container .monaco-editor,
          .code-editor-container .overflow-guard {
            border-radius: 12px !important;
          }
          .code-editor-container .monaco-editor {
            background-color: #020617 !important;
          }
          .code-editor-container .monaco-editor .margin,
          .code-editor-container .monaco-editor-background {
            background-color: #020617 !important;
          }
          .code-editor-container .monaco-scrollable-element > .scrollbar > .slider {
            border-radius: 999px;
          }
        `}
      </style>

      <div className="code-editor-container" style={wrapperStyle}>
        <div style={glowStyle} />
        <div style={headerStyle}>
          <span style={langBadgeStyle}>
            {language.toUpperCase()} editor
          </span>
          <span style={statusStyle}>
            <span style={statusDotStyle} />
            <span>Autosuggestions enabled</span>
          </span>
        </div>

        <Editor
          height="350px"
          language={language}
          value={value}
          theme="vs-dark"
          onChange={handleChange}
          options={{
            fontSize: 14,
            fontFamily: "JetBrains Mono, Menlo, Monaco, Consolas, 'Courier New', monospace",
            fontLigatures: true,
            minimap: { enabled: false },
            wordWrap: "on",
            smoothScrolling: true,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            cursorBlinking: "expand",
            roundedSelection: true,
            lineNumbersMinChars: 3,
            bracketPairColorization: { enabled: true },
            formatOnPaste: true,
          }}
        />
      </div>
    </>
  );
};

export default CodeEditor;
