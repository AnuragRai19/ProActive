// src/services/api.js

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "API Error");
  }
  return response.json();
};

export const api = {
  getAIAnalysis: async (userId) => {
    const response = await fetch(`${BASE_URL}/api/coach/analyze/${userId}`);
    return handleResponse(response);
  },

  getAnalytics: async (userId) => {
    const response = await fetch(`${BASE_URL}/analytics/${userId}`);
    return handleResponse(response);
  },

  getAiAdvice: async (query) => {
    const response = await fetch(`${BASE_URL}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    return handleResponse(response);
  },

  checkHealth: async () => {
    const response = await fetch(`${BASE_URL}/`);
    return handleResponse(response);
  },
};
