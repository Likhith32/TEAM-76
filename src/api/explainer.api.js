// src/api/explainer.api.js
import apiClient from "./axiosClient";

/**
 * Analyze and explain a project
 * @param {FormData} formData
 */
export const explainProject = async (formData) => {
  const response = await apiClient.post(
    "/explainer/analyze",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
