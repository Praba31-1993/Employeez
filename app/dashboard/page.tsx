"use client";
import React, { useState, useEffect } from "react";
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
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userRole = localStorage.getItem("Role");
      setRole(userRole);
    }
  }, []);

  return (
    <Sidebar>
      {role === "SA" && <SuperAdminDashboard />}
      {role === "HR" && <HrDashboard />}
      {role === "M" && <ManagerDashboard />}
      {role === "E" && <EmployeeDashboard />}
      {role === "R" && <RecruiterDashboard />}
      {/* <Immigratorcoordinator/> */}
      {role === "TC" && <TimecoordinatorDashboard />}
      {/* <PayrollAdminDashboard/> */}
      {/* <PayRoleExecutiveDashboard/> */}
      {role === "SM" && <SalesManagerDashboard />}
    </Sidebar>
  );
};

export default Dashboard;
