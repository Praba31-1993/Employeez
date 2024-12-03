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
          <div className="col-12 mb-3 col-md-8">
            <div className="dashboardcard  h-100  p-3">
              <ProfilesCard />
            </div>
          </div>
          {/* List Card Section */}
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
        </div>
     
       
      </div>
    </Sidebar>
  );
};

export default Dashboard;
