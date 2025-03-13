import { axiosInstance } from "./axiosInstance";

export const getEmployeeHiringDetailsByBunit = async (Bunit,type) => {
    try {
      const response = await axiosInstance.get(`/api/dashboard/getEmployeeHiringDetailsByBunit/${Bunit}/${type}`);
      return response; 
    } catch (error) {
      console.error("Error fetching prehire details:", error);
      throw error; 
    }
  };

  export const getWorkForceReportByBunit = async (Bunit) => {
    
    
    try {
      const response = await axiosInstance.get(`/api/dashboard/getWorkForceReportByBunit/${Bunit}`);
      return response; 
    } catch (error) {
      console.error("Error fetching prehire details:", error);
      throw error; 
    }
  };
 

  export const getBusinessUnitList = async () => {
    try {
      const response = await axiosInstance.get(`/api/dashboard/getBusinessUnitList`);
      return response; 
    } catch (error) {
      console.error("Error fetching prehire details:", error);
      throw error; 
    }
  };