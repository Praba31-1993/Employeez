"use client";
import Image from "next/image";
import React from "react";

import { ContactsList } from "@/app/reusableComponent/JsonData";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ImageComponent from "@/app/reusableComponent/image";

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

    return (
        <>
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
                                        Important contact (20)
                                    </p>
                                    <p className="shade para mb-0">
                                        All important contacts displayed here
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {ContactsList?.map((contact: any, index: number) => (
                                <div
                                    className="d-flex align-items-center mb-3"
                                    key={contact?.id}
                                >
                                    <div className="userimages">
                                        <ImageComponent width={0} height={0} user={contact?.img} />
                                    </div>
                                    <div className="ps-4">
                                        <h5 className="para2 textheader mb-0">
                                            {contact?.name} ({contact?.role})
                                        </h5>
                                        <p className="shade para2 mb-0">
                                            <MailOutlineOutlinedIcon sx={{ color: "#D9D9D9" }} />{" "}
                                            <span>{contact?.mail}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


