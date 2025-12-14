import React, { useState } from "react";
import useUpload from "../hooks/useUpload";
import apiClient from "../api/axiosClient";

const TestGenerator = () => {
  const { file, githubUrl, onFileChange, onGithubUrlChange, buildFormData } =
    useUpload();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const generateTests = async () => {
    setError(null);
    setResult(null);

    try {
      setLoading(true);
      const formData = buildFormData();

      const res = await apiClient.post(
        "/testgen/generate",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(res.data);
    } catch (err) {
      setError("Failed to generate tests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">🧪 Test Generator</h1>

      {/* Upload */}
      <div className="space-y-4">
        <input type="file" accept=".zip" onChange={onFileChange} />
        <input
          type="text"
          placeholder="GitHub repository URL"
          value={githubUrl}
          onChange={onGithubUrlChange}
          className="w-full px-3 py-2 border rounded"
        />

        <button
          onClick={generateTests}
          disabled={loading}
          className="px-4 py-2 bg-emerald-600 text-white rounded"
        >
          {loading ? "Generating..." : "Generate Tests"}
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Result */}
      {result && (
        <div className="bg-slate-900 text-slate-100 p-4 rounded space-y-3">
          <p>
            <strong>Framework:</strong> {result.framework || "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {result.status || "unknown"}
          </p>

          {/* ⚠️ WARNING UI */}
          {result.status === "warning" && (
            <div className="text-yellow-400 text-sm">
              ⚠️ {result.message}
            </div>
          )}

          {/* ✅ SUCCESS UI */}
          {result.status === "success" && result.tests && (
            <>
              <h3 className="font-semibold mt-3">Generated Tests</h3>

              {Object.entries(result.tests).map(([file, code]) => (
                <pre
                  key={file}
                  className="whitespace-pre-wrap text-sm bg-slate-800 p-3 rounded"
                >
                  <strong>{file}</strong>
                  {"\n\n"}
                  {code}
                </pre>
              ))}

              {/* ⬇️ DOWNLOAD ZIP BUTTON */}
              {result.zip_path && (
                <button
                  onClick={() => {
                    window.open(
                      `/api/testgen/download?path=${encodeURIComponent(
                        result.zip_path
                      )}`,
                      "_blank"
                    );
                  }}
                  className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded"
                >
                  ⬇️ Download Tests ZIP
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TestGenerator;
