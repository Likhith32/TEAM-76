// src/components/LogViewer.jsx
import React from "react";
import { formatLogs } from "../utils/formatLogs";

/**
 * Props:
 * - logs: array of strings
 */
const LogViewer = ({ logs = [] }) => {
  const formattedLogs = formatLogs(logs);

  if (!formattedLogs.length) {
    return (
      <div className="bg-slate-900 p-4 rounded text-gray-400 text-sm">
        No logs yet
      </div>
    );
  }

  return (
    <div className="bg-slate-900 p-4 rounded space-y-2 max-h-80 overflow-auto">
      {formattedLogs.map((log) => (
        <div
          key={log.id}
          className={`text-sm ${
            log.type === "error"
              ? "text-red-400"
              : log.type === "warning"
              ? "text-yellow-400"
              : "text-gray-200"
          }`}
        >
          <span className="text-xs text-gray-500 mr-2">
            [{log.timestamp}]
          </span>
          {log.message}
        </div>
      ))}
    </div>
  );
};

export default LogViewer;
