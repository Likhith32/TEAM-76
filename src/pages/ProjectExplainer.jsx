// src/pages/ProjectExplainer.jsx
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import useUpload from "../hooks/useUpload";
import apiClient from "../api/axiosClient";

const ProjectExplainer = () => {
  const { githubUrl, onFileChange, onGithubUrlChange, buildFormData } =
    useUpload();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyzeProject = async () => {
    setError(null);
    setResult(null);

    try {
      setLoading(true);
      const formData = buildFormData();

      const res = await apiClient.post(
        "/explainer/analyze",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(res.data);
    } catch {
      setError("Failed to analyze project");
    } finally {
      setLoading(false);
    }
  };

  const explanation = result?.explanation;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">📘 Project Explainer</h1>

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
          onClick={analyzeProject}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          {loading ? "Analyzing..." : "Explain Project"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="bg-slate-900 text-slate-100 p-6 rounded space-y-6">
          <div className="flex gap-6 text-sm">
            <p><strong>Language:</strong> {result.language}</p>
            <p><strong>Framework:</strong> {result.framework}</p>
          </div>

          {explanation?.summary && (
            <section>
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">
                📌 Project Summary
              </h3>
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>
                  {explanation.summary}
                </ReactMarkdown>
              </div>
            </section>
          )}

          {explanation?.architecture && (
            <section>
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">
                🏗 Architecture
              </h3>
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>
                  {explanation.architecture}
                </ReactMarkdown>
              </div>
            </section>
          )}

          {explanation?.tech_stack && (
            <section>
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">
                🧰 Tech Stack
              </h3>
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>
                  {explanation.tech_stack}
                </ReactMarkdown>
              </div>
            </section>
          )}

          {explanation?.entry_points && (
            <section>
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">
                🚪 Entry Points
              </h3>
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>
                  {explanation.entry_points}
                </ReactMarkdown>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectExplainer;
