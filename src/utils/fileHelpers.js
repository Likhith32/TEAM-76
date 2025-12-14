// src/utils/fileHelpers.js
/**
 * Convert bytes to human readable size
 */
export const formatFileSize = (bytes) => {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

/**
 * Get file extension
 */
export const getFileExtension = (fileName) => {
  return fileName?.split(".").pop()?.toLowerCase();
};

/**
 * Check if uploaded file is zip
 */
export const isZipFile = (file) => {
  if (!file) return false;
  return getFileExtension(file.name) === "zip";
};
