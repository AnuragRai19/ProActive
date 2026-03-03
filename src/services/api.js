import { supabase } from "../supabaseClient";

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

/**
 * Helper to get the fresh Supabase token
 */
const getAuthHeaders = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    Authorization: `Bearer ${session?.access_token}`,
    "Content-Type": "application/json",
  };
};

export const api = {
  /**
   * Fetch AI Coach Analysis (Now with Security Token)
   */
  getAIAnalysis: async (userId) => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/api/coach/analyze/${userId}`, {
      headers,
    });
    return handleResponse(response);
  },

  /**
   * Fetch Dashboard Analytics
   */
  getAnalytics: async (userId) => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/analytics/${userId}`, {
      headers,
    });
    return handleResponse(response);
  },

  /**
   * Interactive AI Coach Chat (RAG + Gemini)
   */
  getAiAdvice: async (query) => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/ask`, {
      method: "POST",
      headers,
      body: JSON.stringify({ query }),
    });
    return handleResponse(response);
  },

  /**
   * Health Check (Public endpoint, no token needed)
   */
  checkHealth: async () => {
    const response = await fetch(`${BASE_URL}/`);
    return handleResponse(response);
  },
};
