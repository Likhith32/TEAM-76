// src/api/chatbot.api.js
import apiClient from "./axiosClient";

/**
 * Send a message to AI chatbot
 * @param {string} message
 */
export const sendChatMessage = async (message) => {
  const response = await apiClient.post("/chatbot/chat", {
    message,
  });

  return response.data;
};
