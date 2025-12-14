// src/api/runner.api.js
import apiClient from "./axiosClient";

/**
 * Run + debug a project
 * @param {FormData} formData
 */
export const runProject = async (formData) => {
  const response = await apiClient.post(
    "/runner/run",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
