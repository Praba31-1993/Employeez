import axiosInstance from "./axiosInstance";



// export const LoginApi=(params) =>{
//   return axiosInstance.post("/api/auth/signin", params);
// }

// Login Api
export const LoginApi = async (params) => {

  return axiosInstance.post("/v1/auth/login", params);

}

// Get User Profile
export const getLoginUserDatas = async () => {

  return axiosInstance.get("/v1/auth/profile");
}

// Refresh Token 
export const refreshAccessToken = async (params) => {
  
  return axiosInstance.post("/v1/auth/refresh-token",params);
}

