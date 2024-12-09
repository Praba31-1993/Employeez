import axios from "axios";

// Base URL for your API
// const base_url = process.env.NEXT_PUBLIC_API_URL || "https://api.escuelajs.co/api/";
const base_url = "https://api.escuelajs.co/api";

const accessToken = localStorage.getItem('authToken');
console.log('access',accessToken);


// Create Axios instance
const axiosInstance = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${accessToken}`,   },
});

// Add interceptors to include token, client ID, and additional headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? accessToken: null; // Ensure client-side only
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "default-client-id"; // Replace with your default client ID

    // Add Bearer Token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add Client ID
    config.headers["Client-ID"] = clientId;

    // Add any other default headers if needed
    config.headers["X-Custom-Header"] = "CustomHeaderValue";

    if (process.env.NODE_ENV === 'development') {
      console.log("Request Config:", config);
    }

    return config;
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error("Request Error:", error);
    }
    // Handle request errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
