import { axiosInstance } from "./axiosInstance";

export const getEmployeeHiringDetailsByBunit = async (type) => {
    try {
      const response = await axiosInstance.get(`/api/dashboard/getEmployeeHiringDetailsByBunit/${type}`);
      return response; 
    } catch (error) {
      console.error("Error fetching prehire details:", error);
      throw error; 
    }
  };