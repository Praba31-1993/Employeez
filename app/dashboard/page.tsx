"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/page";
import ListCard from "../reusableComponent/listitems";
import ProfilesCard from "./components/profilescard";
import Pendinginvoice from "./components/pendinginvoice";
import { Colors } from "../reusableComponent/styles";
import ToDoList from "./components/toDoList";
import Menulistforbirthdayworkvacation from "./components/menulistforbirthdayworkvacation";
import birthday from "@/app/assets/img/birthday.svg";
import anniversary from "@/app/assets/img/anniversary.svg";
import BarChartComponent from "../reusableComponent/chart/barchart";
import HorizontalBars from "../reusableComponent/chart/horizontalbarchart";
import ToDoIcon from "@/app/assets/img/todo.svg";
import Image from "next/image";
import Outlinebutton from "../reusableComponent/outlinebtn";
import Hrdatas from "./components/hrdatas";
import {
  arrayList,
  salesReportDatas,
  HiringCounts,
} from "../reusableComponent/JsonData";
import { loginResponse } from "../reusableComponent/JsonData";
import Login from "../login/page";
import SuperAdminDashboard from "./screens/superadmin";
import HrDashboard from "./screens/hr";

const Dashboard = () => {
  const [birthdayAnniversaryReport, setbirthdayAnniversaryReport] = useState();
  const useColors = Colors();
  const borderAndBoxShadowStyles = {
    border: useColors.border,
    boxShadow: useColors.boxshadow,
  };

  useEffect(() => {
    setbirthdayAnniversaryReport(arrayList);
  }, []);

  return (
    <Sidebar>
      <SuperAdminDashboard/>
    </Sidebar>
  );
};

export default Dashboard;
