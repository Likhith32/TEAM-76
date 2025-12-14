// src/components/StatusBadge.jsx
import React from "react";

/**
 * Props:
 * - status: idle | running | success | fixed | failed
 */
const StatusBadge = ({ status = "idle" }) => {
  const normalized = (status || "idle").toLowerCase();

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#0b1120",
    border: "1px solid transparent",
  };

  const dotBase = {
    width: "7px",
    height: "7px",
    borderRadius: "999px",
    boxShadow: "0 0 10px rgba(15,23,42,0.9)",
  };

  const variants = {
    idle: {
      badge: {
        ...baseStyle,
        background: "rgba(31,41,55,0.95)",
        color: "#e5e7eb",
        border: "1px solid rgba(75,85,99,0.9)",
      },
      dot: {
        ...dotBase,
        background: "rgba(148,163,184,1)",
        boxShadow: "0 0 10px rgba(148,163,184,0.8)",
      },
    },
    running: {
      badge: {
        ...baseStyle,
        background: "linear-gradient(135deg, #22d3ee, #6366f1)",
        color: "#0b1120",
      },
      dot: {
        ...dotBase,
        background: "#22c55e",
        boxShadow: "0 0 14px rgba(34,197,94,0.95)",
      },
    },
    success: {
      badge: {
        ...baseStyle,
        background: "linear-gradient(135deg, #22c55e, #16a34a)",
        color: "#022c22",
      },
      dot: {
        ...dotBase,
        background: "#22c55e",
        boxShadow: "0 0 12px rgba(22,163,74,0.95)",
      },
    },
    fixed: {
      badge: {
        ...baseStyle,
        background: "linear-gradient(135deg, #6366f1, #22d3ee)",
        color: "#0b1120",
      },
      dot: {
        ...dotBase,
        background: "#38bdf8",
        boxShadow: "0 0 12px rgba(56,189,248,0.9)",
      },
    },
    failed: {
      badge: {
        ...baseStyle,
        background: "linear-gradient(135deg, #ef4444, #b91c1c)",
        color: "#fef2f2",
      },
      dot: {
        ...dotBase,
        background: "#ef4444",
        boxShadow: "0 0 12px rgba(248,113,113,0.95)",
      },
    },
  };

  const { badge, dot } = variants[normalized] || variants.idle;

  return (
    <>
      <style>
        {`
          @keyframes statusPulse {
            0%,100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.3); opacity: 0.65; }
          }
        `}
      </style>
      <span style={badge}>
        <span
          style={{
            ...dot,
            animation: normalized === "running" ? "statusPulse 1s infinite" : "none",
          }}
        />
        <span>{normalized.toUpperCase()}</span>
      </span>
    </>
  );
};

export default StatusBadge;
