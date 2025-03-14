"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Sidebar from "../sidebar/page";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import { Colors } from "../reusableComponent/styles";
import "../profile/Profile.css";

// ✅ Dynamic Imports (SSR Disabled)
const EditPersonalInfo = dynamic(() => import("./component/edit_personal_info"), { ssr: false });
const ContactInfo = dynamic(() => import("./component/contact_info"), { ssr: false });

function Editprofile() {
    const useColors = Colors(); // Declare useColors once
    const [selectedTab, setSelectedTab] = useState<string>("personal");
    const [isClient, setIsClient] = useState(false); // ✅ Ensure Client-Side Execution

    // ✅ Set `isClient` when mounted
    useEffect(() => {
        setIsClient(true);
    }, []);

    // ✅ Load from `localStorage` on Client-Side Only
    useEffect(() => {
        if (isClient) {
            const storedTab = localStorage.getItem("selectedTab");
            if (storedTab) setSelectedTab(storedTab);
        }
    }, [isClient]);

    // ✅ Save to `localStorage` on Tab Change
    useEffect(() => {
        if (isClient) {
            localStorage.setItem("selectedTab", selectedTab);
        }
    }, [selectedTab, isClient]);

    return (
        <div>
            <Sidebar>
                <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="col-12">
                            <Link className="unselectcolor para2" href="/profile" passHref>
                                <ArrowBackOutlinedIcon className="me-1" sx={{ fontSize: "25px" }} /> Back
                            </Link>
                        </div>

                        <div className="d-flex my-4">
                            {/* Personal Info Tab */}
                            <div
                                className="d-flex px-3 me-md-2 align-items-center cursor-pointer"
                                onClick={() => setSelectedTab("personal")}
                                style={{
                                    backgroundColor: selectedTab === "personal" ? useColors.themeRed : "transparent",
                                    color: selectedTab === "personal" ? "#fff" : "#6d6777",
                                    borderRadius: "5px",
                                    transition: "0.3s"
                                }}
                            >
                                <GroupOutlinedIcon sx={{ fontSize: "18px" }} />
                                <p className="para px-1 px-md-3 mb-0 py-2">Personal Info</p>
                            </div>

                            {/* Contact Info Tab */}
                            <div
                                className="d-flex px-3 align-items-center cursor-pointer"
                                onClick={() => setSelectedTab("contact")}
                                style={{
                                    backgroundColor: selectedTab === "contact" ? useColors.themeRed : "transparent",
                                    color: selectedTab === "contact" ? "#fff" : "#6d6777",
                                    borderRadius: "5px",
                                    transition: "0.3s"
                                }}
                            >
                                <ContactsOutlinedIcon sx={{ fontSize: "18px" }} />
                                <p className="para px-1 px-md-3 mb-0 py-2">Contact Details</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid mb-3">
                    <div className="row">
                        <div className="col-12">
                            {/* ✅ Ensure Dynamic Components Load on Client */}
                            {isClient && selectedTab === "personal" && <EditPersonalInfo />}
                            {isClient && selectedTab === "contact" && <ContactInfo />}
                        </div>
                    </div>
                </div>
            </Sidebar>
        </div>
    );
}

export default Editprofile;
