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
                        <div className="d-flex mt-4">
                            <p
                                className="para cursorpointer px-3 py-2"
                                onClick={() => setSelectedTab("personal")}
                                style={{
                                    backgroundColor: selectedTab === "personal" ? useColors.themeRed : "transparent",
                                    color: selectedTab === "personal" ? "#fff" : "#6d6777",
                                    borderRadius: "5px",
                                }}
                            >
                                <GroupOutlinedIcon className="me-1" sx={{ fontSize: "18px" }} /> Personal info
                            </p>
                            <p
                                className="para cursorpointer px-3 py-2"
                                onClick={() => setSelectedTab("contact")}
                                style={{
                                    backgroundColor: selectedTab === "contact" ? useColors.themeRed : "transparent",
                                    color: selectedTab === "contact" ? "#fff" : "#6d6777 ",
                                    borderRadius: "5px",
                                }}
                            >
                                <ContactsOutlinedIcon className="me-1" sx={{ fontSize: "18px" }} /> Contact details
                            </p>
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
