// src/components/UploadBox.jsx
import React from "react";
import { formatFileSize } from "../utils/fileHelpers";

/**
 * Props:
 * - file
 * - githubUrl
 * - onFileChange
 * - onGithubUrlChange
 */
const UploadBox = ({
  file,
  githubUrl,
  onFileChange,
  onGithubUrlChange,
}) => {
  return (
    <div className="space-y-4 bg-slate-900 p-4 rounded">
      <div>
        <label className="block mb-1 font-medium">Upload ZIP</label>
        <input type="file" accept=".zip" onChange={onFileChange} />
        {file && (
          <p className="text-sm text-gray-400 mt-1">
            {file.name} ({formatFileSize(file.size)})
          </p>
        )}
      </div>

      <div className="text-center text-gray-400">— OR —</div>

      <div>
        <label className="block mb-1 font-medium">GitHub Repository URL</label>
        <input
          type="text"
          placeholder="https://github.com/user/repo"
          value={githubUrl}
          onChange={onGithubUrlChange}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
        />
      </div>
    </div>
  );
};

export default UploadBox;
