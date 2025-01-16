import axios from "axios";


const base_url = "http://localhost:8080/employez/";

const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBRE0wNyIsImNsaWVudElkIjoiZGV2Iiwicm9sZSI6IlNBIiwicGF5c2NoZWR1bGUiOiJNb250aGx5IiwiZXR5cGUiOiJFTVBIIiwiYnVzaW5lc3NVbml0IjoiVVNBIiwicHVuY2hfaW4iOiJOIiwiUHJvakJhc2VkVFMiOiJYIiwiQ291bnRyeUNvZGUiOiJVUyIsIkhpcmluZ01vZGVsQ29kZSI6IlcySCIsImlhdCI6MTczNjUxMjAwMywiZXhwIjoxNzM3MTE2ODAzfQ.GVzFY3Ute0Fs3DK7cEhUmtPTqnL18ygjB7coO5MMXtIrDk5nO8D3zJ81zFISJu3jvWK8-dP5YrBOMI_fTlGhFg"
// Create Axios instance
const axiosInstance = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${accessToken}`, 
    "clientId" : "dev",
  },
});


// Login Api
// Login API function
export const LoginApi = async (params) => {
  try {
    const response = await axiosInstance.post("/api/auth/signin", params);
    return response.data;
  } catch (error) {
    console.error('Error during API call', error);
    throw error;
  }
};


