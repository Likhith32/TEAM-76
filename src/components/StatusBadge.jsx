// src/components/StatusBadge.jsx
import React from "react";

/**
 * Props:
 * - status: idle | running | success | fixed | failed
 */
const StatusBadge = ({ status = "idle" }) => {
  const styles = {
    idle: "bg-gray-600",
    running: "bg-blue-600 animate-pulse",
    success: "bg-emerald-600",
    fixed: "bg-indigo-600",
    failed: "bg-red-600",
  };

  return (
    <span
      className={`px-3 py-1 text-sm rounded-full text-white ${
        styles[status] || styles.idle
      }`}
    >
      {status.toUpperCase()}
    </span>
  );
};

export default StatusBadge;
