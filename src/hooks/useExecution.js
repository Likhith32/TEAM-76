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

      // ✅ GUARANTEE OUTPUT IS PRESERVED
      setExecution({
        ...result,
        output: result.output || "",
        last_error: result.last_error || null,
        fixes: result.fixes || [],
      });

      setStatus(result.status || "success");
    } catch (error) {
      setStatus("failed");
      setExecution({
        output: "",
        last_error: error.message,
        fixes: [],
      });
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
