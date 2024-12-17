"use client";
import React from "react";
import Sidebar from "../sidebar/page";
import SuperAdminDashboard from "./screens/superadmin";

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
