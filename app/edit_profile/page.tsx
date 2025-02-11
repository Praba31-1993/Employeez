"use client";
import React, { useState } from "react";
import Sidebar from "../sidebar/page";
import BreadcrumbsComponent from "../reusableComponent/breadcrumbs";
import "../profile/Profile.css";
import Link from "next/link";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import { Colors } from "../reusableComponent/styles";
import Edit_personal_info from "./component/edit_personal_info";
import Contact_info from "./component/contact_info";

function Editprofile() {
    const useColors = Colors(); // Declare useColors once
    const [selectedTab, setSelectedTab] = useState("personal"); // Default tab

    return (
        <div>
            <Sidebar>
                <div className="container-fluid">
                    <BreadcrumbsComponent selectedTab={""} />
                    <div className="row mt-3">
                        <div className="col-12 ">
                            <Link className="unselectcolor para2" href="/profile" passHref>
                                <ArrowBackOutlinedIcon className="me-1" sx={{ fontSize: "25px" }} /> Back
                            </Link>
                        </div>
                        <div className="d-flex my-4">
                            <div className="d-flex px-3 me-md-2 align-items-center" onClick={() => setSelectedTab("personal")}
                                style={{
                                    backgroundColor: selectedTab === "personal" ? useColors.themeRed : "transparent",
                                    color: selectedTab === "personal" ? "#fff" : "#6d6777",
                                    borderRadius: "5px",
                                    transition:"1s"
                                    
                                }}>
                                     <GroupOutlinedIcon className="" sx={{ fontSize: "18px" }} /> 
                                <p className="para cursorpointer px-1 px-md-3 mb-0 py-2" >
                                   Personal info
                                </p>
                            </div>
                            <div className="d-flex px-3  align-items-center" onClick={() => setSelectedTab("contact")}
                                style={{
                                    backgroundColor: selectedTab === "contact" ? useColors.themeRed : "transparent",
                                    color: selectedTab === "contact" ? "#fff" : "#6d6777",
                                    borderRadius: "5px",
                                    transition:"1s"
                                }}>
                                     <ContactsOutlinedIcon className="" sx={{ fontSize: "18px" }} /> 
                                <p className="para cursorpointer px-1 px-md-3 mb-0 py-2" >
                                Contact details
                                </p>
                            </div>

                            
                        </div>
                    </div>
                </div>
                <div className="container-fluid mb-3">
                    <div className="row">
                        <div className="col-12">
                            {selectedTab === "personal" && <Edit_personal_info />}
                            {selectedTab === "contact" && <Contact_info />}
                        </div>
                    </div>
                </div>
            </Sidebar>
        </div>
    );
}

export default Editprofile;
