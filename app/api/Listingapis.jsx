import axios from "axios";


const base_url = "http://localhost:8080/employez";

// const base_url = "http://192.168.10.126:8080/employez/";

const accessToken ="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBRE0wNyIsImNsaWVudElkIjoiZGV2Iiwicm9sZSI6IlNBIiwicGF5c2NoZWR1bGUiOiJNb250aGx5IiwiZXR5cGUiOiJFTVBIIiwiYnVzaW5lc3NVbml0IjoiVVNBIiwicHVuY2hfaW4iOiJOIiwiUHJvakJhc2VkVFMiOiJYIiwiQ291bnRyeUNvZGUiOiJVUyIsIkhpcmluZ01vZGVsQ29kZSI6IlcySCIsImlhdCI6MTczNzExODk4NSwiZXhwIjoxNzM3NzIzNzg1fQ.TdbQvQmV-tphGAEzxx5B-oWfc6ed5MASaB-4S3XEySVXw48ifhdwUhlk-Gk3IfarqYxidOscw3FwnW6Vts2aNQ"
const axiosInstance = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${accessToken}`, 
    "clientId" : "demo2",
  },
});


// Login Api
// Login API function
export const LoginApi = async (params) => {
  try {
    const response = await axiosInstance.post("/api/auth/signin", params);
    
    return response;
  } catch (error) {
    console.error('Error during API call', error);
    throw error;
  }
};


