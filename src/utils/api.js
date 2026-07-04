import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // Enables transfer of HTTP-only cookies
});

// Interceptor to handle expired access tokens and rotate automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Check if error is unauthorized and has not been retried yet
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/register")
    ) {
      originalRequest._retry = true;
      try {
        console.log("Access token expired. Requesting refresh...");
        // Re-authenticate session via the refresh token cookie
        await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        // Resubmit the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.warn("Session expired. User must log in again.");
        // Forward the error so the auth state is cleaned up
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
