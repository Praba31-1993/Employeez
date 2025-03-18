"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ImageComponent from "@/app/reusableComponent/image";
import { getEmpImpContactDetails } from "@/app/api/Listingapis";

const style: React.CSSProperties = {
    position: "absolute",
    top: "5em",
    right: "0",
    width: 400,
    backgroundColor: "#0600000d",
    borderRadius: "14px",
    border: 0,
};

export default function Contacts({ show, close }: any) {
    const [loading, setLoading] = useState(true);
    const [importantContact, setImportantContact] = useState<any[]>([]);

    useEffect(() => {
        const rememberedUser = localStorage.getItem("rememberedUserId");
        let userId: string | null = null;

        try {
            userId = rememberedUser ? JSON.parse(rememberedUser)?.EmpId : rememberedUser;
        } catch {
            userId = rememberedUser; // If it's not JSON, assume it's a string
        }

        if (userId) {
            ContactsList(userId);
        }

        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const ContactsList = async (userId: string) => {
        try {
            const response = await getEmpImpContactDetails(userId);
            if (response.status === 200 && Array.isArray(response?.data)) {
                setImportantContact(response.data);
                
            } else {
                setImportantContact([]);
            }
        } catch (error) {
            console.error("Error fetching contact details:", error);
        }
    };

    return (
        <section className={`showpopup ${show ? "showpopupactive" : ""}`}>
            <div className="summarysection" style={{ width: "20vw" }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 text-end">
                            <FontAwesomeIcon
                                style={{ cursor: "pointer" }}
                                className="my-2 textheader"
                                icon={faXmark}
                                onClick={close}
                            />
                        </div>
                        <div className="col-12">
                            <div>
                                <p className="heading2 mb-0 text-start">
                                    Important contact 
                                </p>
                                <p className="shade para mb-0">
                                    All important contacts displayed here
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        {importantContact.map((contact: any, index: number) => (
                            <><div className="d-flex align-items-center mb-3" key={contact?.id}>
                                <div className="userimages">
                                    <ImageComponent width={0} height={0} user={contact?.img} />
                                </div>
                                <div className="ps-4">
                                    <h5 className="para2 textheader mb-0">
                                        {contact?.HR_Name} (HR)
                                    </h5>
                                    <p className="shade para2 mb-0">
                                        <MailOutlineOutlinedIcon sx={{ color: "#D9D9D9" }} />{" "}
                                        <span>{contact?.HR_Email}</span>
                                    </p>
                                </div>
                            </div><div className="d-flex align-items-center mb-3" key={contact?.id}>
                                    <div className="userimages">
                                        <ImageComponent width={0} height={0} user={contact?.img} />
                                    </div>
                                    <div className="ps-4">
                                        <h5 className="para2 textheader mb-0">
                                            {contact?.Manager_Name} (Manager)
                                        </h5>
                                        <p className="shade para2 mb-0">
                                            <MailOutlineOutlinedIcon sx={{ color: "#D9D9D9" }} />{" "}
                                            <span>{contact?.ManagerEmail}</span>
                                        </p>
                                    </div>
                                </div></>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
