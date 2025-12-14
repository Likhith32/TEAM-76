// src/context/ExecutionContext.jsx
import { createContext, useContext, useState } from "react";

/**
 * Execution Context
 * Used for AI Runner, Logs, Status, Results
 */

const ExecutionContext = createContext(null);

export const ExecutionProvider = ({ children }) => {
  const [execution, setExecution] = useState(null);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("idle"); 
  // idle | running | success | failed | fixed

  const resetExecution = () => {
    setExecution(null);
    setLogs([]);
    setStatus("idle");
  };

  return (
    <ExecutionContext.Provider
      value={{
        execution,
        setExecution,
        logs,
        setLogs,
        status,
        setStatus,
        resetExecution,
      }}
    >
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
