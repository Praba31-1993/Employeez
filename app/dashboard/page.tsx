"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/page";
import SuperAdminDashboard from "./screens/superadmin";
import HrDashboard from "./screens/hr";
import ManagerDashboard from "./screens/manager";

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
