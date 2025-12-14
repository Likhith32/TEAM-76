// src/api/axiosClient.js
import axios from "axios";

/**
 * Axios client for AUTOMEND AI backend
 * Uses Vite proxy in development
 */
const apiClient = axios.create({
  baseURL: "/api",
  timeout: 120000, // AI tasks may take time
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Global error handling
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error?.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default apiClient;
