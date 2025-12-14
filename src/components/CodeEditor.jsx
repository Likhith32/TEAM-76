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
  return (
    <div className="border border-slate-700 rounded overflow-hidden">
      <Editor
        height="350px"
        language={language}
        value={value}
        theme="vs-dark"
        onChange={(val) => onChange(val)}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
