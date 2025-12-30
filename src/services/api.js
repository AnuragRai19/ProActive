// src/services/api.js

// 1. Define the Backend URL once
// We check if an Environment Variable exists (for production), otherwise use Localhost
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

/**
 * Helper to handle API responses and errors
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "API Error");
  }
  return response.json();
};

// --- API FUNCTIONS ---

export const api = {
  /**
   * Fetch Dashboard Analytics (ACWR, Acute Load, Status)
   */
  getAnalytics: async (userId) => {
    const response = await fetch(`${BASE_URL}/analytics/${userId}`);
    return handleResponse(response);
  },

  /**
   * Fetch AI Coach Advice (RAG)
   */
  getAiAdvice: async (query) => {
    const response = await fetch(`${BASE_URL}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    return handleResponse(response);
  },

  /**
   * (Optional) Health Check to see if backend is running
   */
  checkHealth: async () => {
    const response = await fetch(`${BASE_URL}/`);
    return handleResponse(response);
  },
};
