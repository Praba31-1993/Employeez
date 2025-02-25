import axios from "axios";

const base_url = "http://localhost:8080/employez/";
// const base_url = "http://192.168.10.126:8080/employez/";
// const base_url="https://demo2.employez.ai/employez" --don't work in this url


const accessToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBRE0wNyIsImNsaWVudElkIjoiZGVtbzIiLCJyb2xlIjoiU0EiLCJwYXlzY2hlZHVsZSI6Ik1vbnRobHkiLCJldHlwZSI6IkVNUEgiLCJidXNpbmVzc1VuaXQiOiJVU0EiLCJwdW5jaF9pbiI6Ik4iLCJQcm9qQmFzZWRUUyI6IlgiLCJDb3VudHJ5Q29kZSI6IlVTIiwiSGlyaW5nTW9kZWxDb2RlIjoiVzJIIiwiaWF0IjoxNzM4ODQ1NzY5LCJleHAiOjE3Mzk0NTA1Njl9.rHmrtMPI0rqGQYoMmu3kWT67IKLjUheVP_gMcjAQiODVXscZIeWZbHkrM1QaQdfu9RcM4qwnqEe_RFsoelHUww"
export const axiosInstance = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`,
    "clientId": "dev",
  },
});
