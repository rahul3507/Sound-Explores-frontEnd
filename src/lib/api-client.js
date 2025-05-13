// src/lib/api-client.js
import axios from "axios";

// Use environment variable for API URL or default to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4500";

console.log("API URL:", API_URL);

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token from cookies if available
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    // We'll use withCredentials for cookies, so no need to manually set the auth header
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling common error scenarios
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error.response?.data || error.message);

    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access detected, clearing auth state");
      // Clear auth cookie
      document.cookie = "isAuthenticated=; Max-Age=0; path=/;";

      // Redirect to login page if not already there
      if (!window.location.pathname.includes("/signin")) {
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
