// src/components/LogViewer.jsx
import React from "react";
import { formatLogs } from "../utils/formatLogs";

/**
 * Props:
 * - logs: array of strings
 */
const LogViewer = ({ logs = [] }) => {
  const formattedLogs = formatLogs(logs);

  const emptyWrapperStyle = {
    borderRadius: "18px",
    border: "1px solid rgba(148,163,184,0.35)",
    background: "rgba(15,23,42,0.9)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    padding: "10px 12px",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#9ca3af",
    fontSize: "0.8rem",
  };

  const wrapperStyle = {
    borderRadius: "18px",
    border: "1px solid rgba(148,163,184,0.35)",
    background: "rgba(15,23,42,0.95)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    padding: "10px 12px",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#e5e7eb",
    fontSize: "0.8rem",
    maxHeight: "20rem",
    overflow: "auto",
  };

  const logRowStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "6px",
    padding: "2px 0",
  };

  const tsStyle = {
    fontSize: "0.7rem",
    color: "#6b7280",
    minWidth: "92px",
    flexShrink: 0,
  };

  const badgeBase = {
    fontSize: "0.65rem",
    padding: "1px 6px",
    borderRadius: "999px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    flexShrink: 0,
  };

  const badgeByType = {
    error: {
      ...badgeBase,
      background: "rgba(127,29,29,0.9)",
      color: "#fecaca",
      border: "1px solid rgba(248,113,113,0.8)",
    },
    warning: {
      ...badgeBase,
      background: "rgba(113,63,18,0.9)",
      color: "#facc15",
      border: "1px solid rgba(251,191,36,0.8)",
    },
    info: {
      ...badgeBase,
      background: "rgba(15,23,42,0.9)",
      color: "#bae6fd",
      border: "1px solid rgba(56,189,248,0.7)",
    },
  };

  const messageStyle = {
    flex: 1,
    wordBreak: "break-word",
  };

  if (!formattedLogs.length) {
    return (
      <>
        <style>
          {`
            .log-scroll::-webkit-scrollbar {
              width: 6px;
            }
            .log-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
            .log-scroll::-webkit-scrollbar-thumb {
              background: rgba(148,163,184,0.6);
              border-radius: 999px;
            }
          `}
        </style>
        <div style={emptyWrapperStyle}>No logs yet</div>
      </>
    );
  }

  return (
    <>
      <style>
        {`
          .log-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .log-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .log-scroll::-webkit-scrollbar-thumb {
            background: rgba(148,163,184,0.6);
            border-radius: 999px;
          }
        `}
      </style>

      <div style={wrapperStyle} className="log-scroll">
        {formattedLogs.map((log) => {
          const type = log.type || "info";
          const badgeStyle = badgeByType[type] || badgeByType.info;
          const colorByType =
            type === "error"
              ? "#fecaca"
              : type === "warning"
              ? "#facc15"
              : "#e5e7eb";

          return (
            <div key={log.id} style={logRowStyle}>
              <span style={tsStyle}>[{log.timestamp}]</span>
              <span style={badgeStyle}>{type}</span>
              <span style={{ ...messageStyle, color: colorByType }}>
                {log.message}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LogViewer;
