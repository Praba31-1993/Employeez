import React from "react";
import Image from "next/image";
import { Avatar } from "@mui/material";
import user2 from "/assets/img/Group 9244.svg";
import ImageComponent from "./image";
import { Colors } from "./styles";
function Menulistitem() {
    const useColors = Colors();
    return (
        <>
            <div className="approverlist  align-items-center d-flex mt-2">
                <div className="userimages">
                    {/* <Image className="" src={user2} alt={""} /> */}
                    <ImageComponent
                        width={0}
                        height={0}
                        user={"/assets/img/Ellipse 14.svg"}
                    />
                </div>
                <div className="roles ps-2">
                    <h5 className="para textheader  mb-0 ">Thamiz Arasan</h5>
                    <p className="para2 mb-0 mt-1 shade">CEO</p>
                    <p
                        className="mb-0 cursorPointer para pe-3 d-sm-none d-block"
                        style={{ color: useColors.themeRed }}
                    >
                        Supervisee
                    </p>
                </div>
            </div>
        </>
    );
}

export default Menulistitem;
