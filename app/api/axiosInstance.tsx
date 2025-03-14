import axios from "axios";

const base_url = "http://192.168.10.126:8080/employez/";
// const base_url="https://demo2.employez.ai/employez" -- doesn't work in this url

export const axiosInstance = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
    "clientId": "dev",
  },
});

// Add a request interceptor to dynamically set Authorization header
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") { // Ensure this runs only on the client side
    const accessToken = localStorage.getItem("token");
    console.log("accessToken", accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

export default axiosInstance;
