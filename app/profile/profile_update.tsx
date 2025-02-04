"use client";
import React, { useState, ReactNode, useEffect } from "react";
import { Colors } from '../reusableComponent/styles';
import Image from "next/image";
import profilepicture from "@/public/assets/img/profilepic.svg";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import Outlinebutton from "../reusableComponent/outlinebtn";
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';


function Profile_update() {
    const useColors = Colors(); // Declare useColors once
    return (
        <>
        <div className='row mt-3'>
            <div className="col-12">
                <h3 className="heading textheader">My Profile</h3>
            </div>
        </div><div className="row">
                <div className="col-md-3 col-xxl-2">
                    <div className="profilepicture">
                        <div className="Profileimg" >
                            <Image className="w-100 h-100 rounded" src={profilepicture} style={{ objectFit: "cover" }} alt={""} />
                        </div>
                        <p className="para text-md-center cursorpointer mt-2" style={{ color: "#8C57FF" }}>Upload Picture <EditOutlinedIcon sx={{ fontSize: "20px" }} /> </p>
                    </div>
                </div>


                <div className="col-md-9 col-xxl-10">
                    <h1 className="heading textheader">Bill Thomas (adm07)</h1>
                    <div className="d-flex flex-wrap">
                        <p className="para unselectcolor "> <EmailOutlinedIcon sx={{ fontSize: "20px" }} className="me-2" /> Billthomas@employez.com </p>
                        <p className="para unselectcolor ps-md-4"> <PhoneOutlinedIcon sx={{ fontSize: "20px" }} className="me-2" /> +1 6820172391 </p>
                    </div>
                    <Outlinebutton
                        color={useColors.white}
                        border={`1px solid ${useColors.themeRed}`}
                        text="Change request"
                        fontSize="12px"
                        background={useColors.themeRed}
                        iscontactus={true}
                        icon={<PublishedWithChangesOutlinedIcon />} />

                </div>
            </div>
            </>
    )
}

export default Profile_update
