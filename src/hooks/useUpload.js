// src/hooks/useUpload.js
import { useState } from "react";

const useUpload = () => {
  const [file, setFile] = useState(null);
  const [githubUrl, setGithubUrl] = useState("");

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setGithubUrl("");
  };

  const onGithubUrlChange = (e) => {
    setGithubUrl(e.target.value);
    setFile(null);
  };

  const buildFormData = () => {
    const formData = new FormData();

    if (file) {
      formData.append("project", file);
    }

    if (githubUrl) {
      formData.append("github_url", githubUrl);
    }

    return formData;
  };

  return {
    file,
    githubUrl,
    onFileChange,
    onGithubUrlChange,
    buildFormData,
  };
};

export default useUpload;
