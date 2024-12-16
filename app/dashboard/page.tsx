"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/page";
import SuperAdminDashboard from "./screens/superadmin";
import HrDashboard from "./screens/hr";
import ManagerDashboard from "./screens/manager";
import Employee from "./screens/employee";
import Recruiter from "./screens/recruiter";
import SalesManager from "./screens/salesManager";
import Immigratorcoordinator from "./screens/immigratorcoordinator";
import Timecoordinator from "./screens/timecoordinator";
import PayRoleExecutive from "./screens/payrollexecutive";
import PayrollAdmin from "./screens/payrolladmin";

const Dashboard = () => {
  return (
    <Sidebar>

      

      
      <SuperAdminDashboard />
      {/* <HrDashboard/> */}
      {/* <ManagerDashboard /> */}
    </Sidebar>
  );
};

export default Dashboard;
