import React from "react";
import useUpload from "../hooks/useUpload";
import useExecution from "../hooks/useExecution";
import { validateUpload } from "../utils/validators";

const Runner = () => {
  const {
    file,
    githubUrl,
    onFileChange,
    onGithubUrlChange,
    buildFormData,
  } = useUpload();

  const {
    execution,
    status,
    startExecution,
    resetExecution,
  } = useExecution();

  const runProject = () => {
    const error = validateUpload({ file, githubUrl });
    if (error) return alert(error);

    startExecution(buildFormData());
  };

  const runWithWrapper = () => {
    const formData = buildFormData();
    formData.append("run_mode", "wrapper");
    startExecution(formData);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold flex items-center gap-2">
        ⚙️ AI Runner
      </h1>

      {/* Upload Section */}
      <div className="bg-slate-900 p-4 rounded space-y-3">
        <input type="file" accept=".zip" onChange={onFileChange} />

        <input
          type="text"
          placeholder="GitHub repository URL"
          value={githubUrl}
          onChange={onGithubUrlChange}
          className="w-full px-3 py-2 border rounded bg-slate-800 text-white"
        />

        <div className="flex gap-3">
          <button
            onClick={runProject}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded"
          >
            Run Project
          </button>

          <button
            onClick={resetExecution}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Status Section */}
      <div className="bg-slate-900 p-4 rounded space-y-4">
        <p>
          <strong>Status:</strong>{" "}
          <span className="capitalize text-indigo-400">{status}</span>
        </p>

        {/* 🚫 Not Executable (Library Project) */}
        {execution?.status === "not_executable" && (
          <div className="bg-yellow-900/40 border border-yellow-600 text-yellow-300 p-4 rounded">
            <p className="font-semibold text-lg">
              🧠 Library-style Python project detected
            </p>
            <p className="text-sm mt-1">
              This project has no entry file (<code>app.py</code> or{" "}
              <code>main.py</code>).
            </p>

            <p className="text-sm mt-2 text-slate-300">
              You can still run it using an AI-generated execution wrapper.
            </p>

            <button
              onClick={runWithWrapper}
              className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
            >
              ▶ Run with AI Wrapper
            </button>
          </div>
        )}

        {/* ✅ Output */}
        {execution?.output && (
          <div>
            <h3 className="font-semibold text-green-400">Output</h3>
            <pre className="text-sm whitespace-pre-wrap bg-slate-800 p-3 rounded mt-1">
              {execution.output}
            </pre>
          </div>
        )}

        {/* 🛠 Fixes Applied */}
        {Array.isArray(execution?.fixes) && execution.fixes.length > 0 && (
          <div>
            <h3 className="font-semibold text-blue-400">Fixes Applied</h3>
            <ul className="list-disc ml-6 text-sm space-y-1">
              {execution.fixes.map((fix, i) => (
                <li key={i}>{fix.explanation}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ❌ Final Error */}
        {execution?.last_error && (
          <div>
            <h3 className="font-semibold text-red-400">Final Error</h3>
            <pre className="text-sm whitespace-pre-wrap bg-slate-800 p-3 rounded text-red-400">
              {execution.last_error}
            </pre>
          </div>
        )}

        {/* 🎉 Success Messages */}
        {(status === "success" ||
          status === "fixed" ||
          status === "wrapper_executed") &&
          !execution?.last_error && (
            <p className="text-green-400 text-sm">
              ✅ Project executed successfully
            </p>
          )}
      </div>
    </div>
  );
};

export default Runner;
