// src/utils/validators.js
/**
 * Validate GitHub repository URL
 */
export const isValidGitHubUrl = (url) => {
  if (!url) return false;
  const regex = /^https:\/\/github\.com\/[^/]+\/[^/]+$/;
  return regex.test(url);
};

/**
 * Validate upload selection
 */
export const validateUpload = ({ file, githubUrl }) => {
  if (!file && !githubUrl) {
    return "Please upload a ZIP file or provide a GitHub URL.";
  }

  if (githubUrl && !isValidGitHubUrl(githubUrl)) {
    return "Invalid GitHub repository URL.";
  }

  return null;
};
