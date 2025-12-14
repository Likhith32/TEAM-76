// src/utils/formatLogs.js
/**
 * Normalize logs into UI-friendly format
 */
export const formatLogs = (logs = []) => {
  return logs.map((log, index) => ({
    id: index,
    type: detectLogType(log),
    message: log,
    timestamp: new Date().toLocaleTimeString(),
  }));
};

/**
 * Detect log type for styling
 */
const detectLogType = (log) => {
  if (!log) return "info";
  if (log.toLowerCase().includes("error")) return "error";
  if (log.toLowerCase().includes("warning")) return "warning";
  return "info";
};
