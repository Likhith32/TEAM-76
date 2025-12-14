// src/hooks/useExecution.js
import { useExecution } from "../context/ExecutionContext";
import { runProject } from "../api/runner.api";

const useExecutionHook = () => {
  const {
    execution,
    setExecution,
    logs,
    setLogs,
    status,
    setStatus,
    resetExecution,
  } = useExecution();

  const startExecution = async (formData) => {
    try {
      setStatus("running");
      setLogs([]);

      const result = await runProject(formData);

      setExecution(result);
      setStatus(result.status || "success");
    } catch (error) {
      setStatus("failed");
      setLogs((prev) => [...prev, error.message]);
    }
  };

  return {
    execution,
    logs,
    status,
    startExecution,
    resetExecution,
  };
};

export default useExecutionHook;
