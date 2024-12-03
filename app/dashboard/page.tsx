"use client";
import React, { useState } from "react";
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

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const useColors = Colors();

  return (
    <Sidebar>
      <div className="container-fluid my-3">
        <div className="row ">
          {/* Profiles Card Section */}
          <div className="col-12 col-md-8">
            <div
              className="dashboardcard mb-2   p-3"
              style={{
                border: useColors.border,
                boxShadow: useColors.boxshadow,
              }}
            >
              <ProfilesCard />
            </div>
          </div>
          {/* List Card Section */}
          <div className="col-12 col-md-4">
            <div className="card shadow rounded">
              <ListCard />
            </div>
          </div>
          <div
            className=" col-12 col-md-4"
            style={{ border: useColors.border, boxShadow: useColors.boxshadow }}
          >
            <div className="dashboardcard">
              <Pendinginvoice />
            </div>
          </div>
          <div
            className=" col-12 col-md-4"
            style={{ border: useColors.border, boxShadow: useColors.boxshadow }}
          >
            <div className="dashboardcard mb-3 p-3 h-100">
              <ToDoList />
            </div>
          </div>
        </div>
        {/* Second Row */}
      </div>
    </Sidebar>
  );
};

export default Dashboard;
