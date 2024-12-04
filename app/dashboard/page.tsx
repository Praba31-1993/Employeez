"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/page";
import ListCard from "../reusableComponent/listitems";
import ProfilesCard from "./profilescard";
import Pendinginvoice from "./pendinginvoice";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { Divider } from "@mui/material";
import { Colors } from "../reusableComponent/styles";
import ToDoList from "./toDoList";
import Menulistforbirthdayworkvacation from "../reusableComponent/menulistforbirthdayworkvacation";
import birthday from "@/app/assets/img/birthday.svg";
import anniversary from "@/app/assets/img/anniversary.svg";
import BarChartComponent from "../reusableComponent/chart/barchart";
import HorizontalBars from "../reusableComponent/chart/horizontalbarchart";
import ToDoIcon from "@/app/assets/img/todo.svg";
import Image from "next/image";
import Outlinebutton from "../reusableComponent/outlinebtn";
import Hrdatas from "./hrdatas";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [birthdayAnniversaryReport, setbirthdayAnniversaryReport] = useState();
  const useColors = Colors();

  const arrayList: any = [
    {
      name: "Gloria mehckilm",
      role: "Assistant manager",
      day: "Today",
    },
    {
      name: "David mechkam",
      role: "HR",
      day: "Tomorrow",
    },
  ];

  const salesReportDatas = [
    {
      name: "Total Sales",
      sales: "$48,568.20",
    },
    {
      name: "Total Income",
      sales: "$38,453.25",
    },
    {
      name: "Total Expenses",
      sales: "$2,453.45",
    },
    {
      name: "Pendiing",
      sales: "$482.85k",
    },
  ];

  const HiringCounts = [
    {
      label: "Prehire",
      count: 22,
    },
    {
      label: "Hiring",
      count: 22,
    },
    {
      label: "Onboarding",
      count: 108,
    },
    {
      label: "Supplier Onboarding",
      count: 22,
    },
  ];

  useEffect(() => {
    setbirthdayAnniversaryReport(arrayList);
  }, []);

  const borderAndBoxShadowStyles = {
    border: useColors.border,
    boxShadow: useColors.boxshadow,
  };

  return (
    <Sidebar>
      <div className="container-fluid my-3">
        <div className="row ">
          <div className="col-12 mb-3 col-md-8">
            <div className="dashboardcard  h-100  p-3">
              <ProfilesCard />
            </div>
          </div>

          <div className="col-12 mb-3 col-md-4">
            <div
              className=" dashboardcard  p-3 h-100"
              style={borderAndBoxShadowStyles}
            >
              <ListCard />
            </div>
          </div>
          <div className=" col-12 mb-3 col-md-5 ">
            <div
              className="dashboardcard p-3 h-100"
              style={borderAndBoxShadowStyles}
            >
              <Pendinginvoice />
            </div>
          </div>
          <div className=" col-12 mb-3 col-md-3 ">
            <div
              className="dashboardcard p-3 h-100"
              style={borderAndBoxShadowStyles}
            >
              <ToDoList />
            </div>
          </div>
          <div className=" col-12 mb-3 col-md-4 ">
            <div
              className="dashboardcard p-3 mb-3"
              style={borderAndBoxShadowStyles}
            >
              <Menulistforbirthdayworkvacation
                title={"Upcoming birthday"}
                headerImage={birthday}
                items={birthdayAnniversaryReport}
              />
            </div>
            <div className="dashboardcard p-3" style={borderAndBoxShadowStyles}>
              <Menulistforbirthdayworkvacation
                title={"Work anniversary"}
                headerImage={anniversary}
                items={birthdayAnniversaryReport}
              />
            </div>
          </div>
          <div className=" col-12 mb-3 col-md-6 ">
            <div className="row p-3 g-4">
              <div className="col-sm-12 col-md-6 h-100 ">
                <div
                  className="dashboardcard p-3"
                  style={{
                    border: useColors.border,
                    boxShadow: useColors.boxshadow,
                  }}
                >
                  <Menulistforbirthdayworkvacation
                    title={"Project extension"}
                    headerImage={anniversary}
                    items={birthdayAnniversaryReport}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-6 h-100">
                <div
                  className="dashboardcard p-3"
                  style={{
                    border: useColors.border,
                    boxShadow: useColors.boxshadow,
                  }}
                >
                  <Menulistforbirthdayworkvacation
                    title={"Vacation report"}
                    headerImage={anniversary}
                    items={birthdayAnniversaryReport}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-6 h-100 ">
                <div
                  className="dashboardcard p-3"
                  style={{
                    border: useColors.border,
                    boxShadow: useColors.boxshadow,
                  }}
                >
                  <Menulistforbirthdayworkvacation
                    title={"Open jobs"}
                    headerImage={anniversary}
                    items={birthdayAnniversaryReport}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-6 h-100 ">
                <div
                  className="dashboardcard p-3"
                  style={{
                    border: useColors.border,
                    boxShadow: useColors.boxshadow,
                  }}
                >
                  <Menulistforbirthdayworkvacation
                    title={"I-9 Verify"}
                    headerImage={anniversary}
                    items={birthdayAnniversaryReport}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" col-12 mb-3 col-md-6 p-0">
            <div className="dashboardcard p-3">
              <div className="row">
                <p className="textheader heading2">Sales Report</p>
                <div className=" col-12 mb-3 col-md-7 ">
                  <BarChartComponent />
                </div>
                <div className=" col-12 mb-3 col-md-5 ">
                  <Menulistforbirthdayworkvacation
                    title={"Work anniversary"}
                    headerImage={anniversary}
                    items={salesReportDatas}
                    isSalesReport={true}
                    lastmonthReport={"$2845K"}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=" col-12 mb-3 col-md-4 ">
            <div className="dashboardcard p-3">
              <p className="textheader heading2">Pending HR action</p>

              <HorizontalBars />
            </div>
          </div>
          <div className="col-12 mb-3 col-md-2 ">
            {HiringCounts?.map((list: any, index: number) => (
              <>
                <Hrdatas hrList={list} isPendingHrData={false} />
              </>
            ))}
          </div>

          <div className="col-12 mb-3 col-md-3">
            <div className="dashboardcard p-3">
              <p className="textheader heading2">Policy/Procedure </p>
              <div
                className="d-flex flex-wrap flex-column gap-3"
                style={{ height: "10rem" }}
              >
                {HiringCounts?.map((list: any, index: number) => (
                  <div className="row p-0 mb-0">
                    <div className="col-12 col-md-6">
                      <Hrdatas hrList={list} isPendingHrData={true} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 mb-3 col-md-3">
            <div className="dashboardcard p-3">
              <div className="d-flex justify-content-between ">
                <p className="textheader heading2">Need help?</p>

                <Image src={ToDoIcon} alt="" />
              </div>
              <p className="para shade">
                Do you face any problem while using EmployEz?
              </p>
              <Outlinebutton
                color={useColors.white}
                border={`1px solid ${useColors.themeRed}`}
                text="Contact us"
                fontSize="12px"
                background={useColors.themeRed}
                isDashboardIcon={false}
              />
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Dashboard;
