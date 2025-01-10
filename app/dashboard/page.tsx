"use client";
import React from "react";
import SuperAdminDashboard from "./screens/superadmin";
import HrDashboard from "./screens/hr";
import ManagerDashboard from "./screens/manager";
import EmployeeDashboard from "./screens/employee";
import RecruiterDashboard from "./screens/recruiter";
import Immigratorcoordinator from "./screens/immigratorcoordinator";
import PayrollAdminDashboard from "./screens/payrolladmin";
import TimecoordinatorDashboard from "./screens/timecoordinator";
import PayRoleExecutiveDashboard from "./screens/payrollexecutive";
import SalesManagerDashboard from "./screens/salesManager";
import Sidebar from "../sidebar/page";

const Dashboard = () => {
  return (
    <Sidebar>
      <SuperAdminDashboard />
      {/* <HrDashboard/> */}
      {/* <ManagerDashboard /> */}
      {/* <ManagerDashboard/> */}
      {/* <EmployeeDashboard/> */}
      {/* <RecruiterDashboard/> */}
      {/* <Immigratorcoordinator/> */}
      {/* <TimecoordinatorDashboard/> */}
      {/* <PayrollAdminDashboard/> */}
      {/* <PayRoleExecutiveDashboard/> */}
      {/* <SalesManagerDashboard/> */}
      
    </Sidebar>
  );
};

export default Dashboard;
