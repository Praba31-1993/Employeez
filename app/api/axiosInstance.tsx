import axios from "axios";

// const base_url = "http://localhost:8080/employez/";
const base_url = "http://192.168.10.126:8080/employez/";
// const base_url="https://demo2.employez.ai/employez" --don't work in this url



const accessToken =
localStorage.getItem('token')

console.log('accesssToken', accessToken);

export const axiosInstance = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`,
    "clientId": "dev",
  },
});
