import axios from "axios";

export const httpRequest = axios.create({
  baseURL:   process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Response Interceptor
httpRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 1. Handle 401 Unauthorized (Expired Session)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Prevent infinite loops if refresh also fails
      originalRequest._retry = true;

      if (typeof window !== "undefined") {
        // Option A: Hard Redirect (Your current approach)
        window.location.href = "/sign-in?expired=true";
        
        // Option B: Better for Next.js (Silent redirect)
        // You would typically handle this via a Global Auth Provider/Context
      }
      return Promise.reject(new Error("UNAUTHORIZED"));
    }

    // 2. Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error("Permission Denied: You do not have access to this resource.");
    }

    // 3. Handle Network Errors / Server Down
    if (!error.response) {
      console.error("Network Error: Please check your internet connection.");
    }

    return Promise.reject(error);
  }
);