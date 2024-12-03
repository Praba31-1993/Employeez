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
    return (

        <Sidebar>
            <div className="container-fluid my-3">
                <div className="row ">
                    {/* Profiles Card Section */}
                    <div className="col-12 mb-3 col-md-8">
                        <div className="dashboardcard  h-100  p-3" >
                            <ProfilesCard />
                        </div>
                    </div>
                    {/* List Card Section */}
                    <div className="col-12 mb-3 col-md-4">
                        <div className=" dashboardcard  p-3 h-100" style={{border:useColors.border,boxShadow:useColors.boxshadow}}>
                            <ListCard />
                        </div>
                    </div>
                    <div className=" col-12 mb-3 col-md-6 " >
                        <div className="dashboardcard p-3 h-100" style={{border:useColors.border,boxShadow:useColors.boxshadow}}>
                         <Pendinginvoice />
                        </div>
                        
                    </div>
                </div>
                {/* Second Row */}

                <div className="row">
                    {/* Profiles Card Section */}
                   

                    <div className="card col-12 col-md-4">
                        <ListItem>
                            <ListItemText primary="Pending invoices" />
                        </ListItem>
                        {[1, 2, 3, 4].map((list: any) => (
                            <div key={list}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                                    <ListItemText sx={{ mt: 3 }}>21-08-2029</ListItemText>
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </div> 

                    {/* <div className="card col-12 col-md-4">
                        <ListItem>
                            <ListItemText primary="Pending invoices" />
                        </ListItem>
                        {[1, 2, 3, 4].map((list: any) => (
                            <div key={list}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                                    <ListItemText>21-08-2029</ListItemText>
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </div> */}
                </div>
                {/* <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="d-flex gap-3">
                            <Cards />
                            <Cards />
                        </div>
                        <div className="d-flex gap-3">
                            <Cards />
                            <Cards />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">B</div>
                </div> */}
            </div>
        </Sidebar>

    );
};

export default Dashboard;
