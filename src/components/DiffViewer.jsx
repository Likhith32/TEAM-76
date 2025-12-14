// src/components/DiffViewer.jsx
import React from "react";

/**
 * Props:
 * - original: string
 * - modified: string
 */
const DiffViewer = ({ original = "", modified = "" }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 p-4 rounded">
      <div>
        <h3 className="font-semibold mb-2">Original</h3>
        <pre className="text-sm whitespace-pre-wrap bg-slate-800 p-3 rounded overflow-auto max-h-80">
          {original || "—"}
        </pre>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Modified</h3>
        <pre className="text-sm whitespace-pre-wrap bg-slate-800 p-3 rounded overflow-auto max-h-80">
          {modified || "—"}
        </pre>
      </div>
    </div>
  );
};

export default DiffViewer;
