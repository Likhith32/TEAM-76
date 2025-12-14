// src/api/testgen.api.js
import apiClient from "./axiosClient";

/**
 * Generate and run tests for a project
 * @param {FormData} formData
 */
export const generateTests = async (formData) => {
  const response = await apiClient.post(
    "/testgen/generate",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
