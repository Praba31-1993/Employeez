import axiosInstance from "./axiosInstance";



export const LoginApi=(params) =>{
  return axiosInstance.post("/api/auth/signin", params);
}

