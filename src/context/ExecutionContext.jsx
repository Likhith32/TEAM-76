// src/context/ExecutionContext.jsx
import { createContext, useContext, useMemo, useState } from "react";

/**
 * Execution Context
 * Used for AI Runner, Logs, Status, Results
 *
 * status: idle | running | success | failed | fixed | wrapper_executed | not_executable
 */

const ExecutionContext = createContext(null);

export const ExecutionProvider = ({ children }) => {
  const [execution, setExecution] = useState(null);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | running | success | failed | fixed

  const resetExecution = () => {
    setExecution(null);
    setLogs([]);
    setStatus("idle");
  };

  const startExecution = (initialExecution = null) => {
    setStatus("running");
    if (initialExecution) {
      setExecution(initialExecution);
    }
  };

  const appendLog = (entry) => {
    setLogs((prev) => [...prev, entry]);
  };

  const value = useMemo(
    () => ({
      execution,
      setExecution,
      logs,
      setLogs,
      appendLog,
      status,
      setStatus,
      startExecution,
      resetExecution,
    }),
    [execution, logs, status]
  );

  return (
    <ExecutionContext.Provider value={value}>
      {children}
    </ExecutionContext.Provider>
  );
};

/**
 * Custom hook
 */
export const useExecution = () => {
  const context = useContext(ExecutionContext);
  if (!context) {
    throw new Error("useExecution must be used within ExecutionProvider");
  }
  return context;
};
