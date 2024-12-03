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

  useEffect(() => {
    setbirthdayAnniversaryReport(arrayList);
  }, []);

  return (
    <Sidebar>
      <div className="container-fluid my-3">
        <div className="row ">
          {/* Profiles Card Section */}
          <div className="col-12 mb-3 col-md-8">
            <div className="dashboardcard  h-100  p-3">
              <ProfilesCard />
            </div>
          </div>

          <div className="col-12 mb-3 col-md-4">
            <div
              className=" dashboardcard  p-3 h-100"
              style={{
                border: useColors.border,
                boxShadow: useColors.boxshadow,
              }}
            >
              <ListCard />
            </div>
          </div>
          <div className=" col-12 mb-3 col-md-5 ">
            <div
              className="dashboardcard p-3 h-100"
              style={{
                border: useColors.border,
                boxShadow: useColors.boxshadow,
              }}
            >
              <Pendinginvoice />
            </div>
          </div>
          <div className=" col-12 mb-3 col-md-3 ">
            <div
              className="dashboardcard p-3 h-100"
              style={{
                border: useColors.border,
                boxShadow: useColors.boxshadow,
              }}
            >
              <ToDoList />
            </div>
          </div>
          <div className=" col-12 mb-3 col-md-4 ">
            <div
              className="dashboardcard p-3 mb-3"
              style={{
                border: useColors.border,
                boxShadow: useColors.boxshadow,
              }}
            >
              <Menulistforbirthdayworkvacation
                title={"Upcoming birthday"}
                headerImage={birthday}
                items={birthdayAnniversaryReport}
              />
            </div>
            <div
              className="dashboardcard p-3"
              style={{
                border: useColors.border,
                boxShadow: useColors.boxshadow,
              }}
            >
              <Menulistforbirthdayworkvacation
                title={"Work anniversary"}
                headerImage={anniversary}
                items={birthdayAnniversaryReport}
              />
            </div>
          </div>
          <div className=" col-12 mb-3 col-md-7 ">
            <div className="row ">
              <div
                className="col-sm-12 col-md-5 dashboardcard p-3 h-100 "
                style={{
                  border: useColors.border,
                  boxShadow: useColors.boxshadow,
                }}
              >
                <ToDoList />
              </div>
              <div
                className="col-sm-12 col-md-5 dashboardcard p-3 h-100 ml-5"
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
              <div
                className="col-sm-12 col-md-5 dashboardcard p-3 h-100 ml-5"
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
              <div
                className="col-sm-12 col-md-5 dashboardcard p-3 h-100 ml-5"
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
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Dashboard;
