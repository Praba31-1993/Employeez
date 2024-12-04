import axios from "axios";

// Base URL for your API
const base_url = process.env.NEXT_PUBLIC_API_URL ; 

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors to include token, client ID, and additional headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Retrieve token from localStorage or another secure source
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "default-client-id"; // Replace with your default client ID

  // Add Bearer Token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Add Client ID
  config.headers["Client-ID"] = clientId;

  // Add any other default headers if needed
  config.headers["X-Custom-Header"] = "CustomHeaderValue";

  return config;
}, (error) => {
  // Handle request errors
  return Promise.reject(error);
});

export default axiosInstance;
