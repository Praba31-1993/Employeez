import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Avatar } from "@mui/material";
import user2 from "/assets/img/Group 9244.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ImageComponent from "./image";
import { Colors } from "./styles";
function Menulistitem() {
    const useColors = Colors();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Simulating a fetch delay for demo purposes
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Loader will disappear after 2 seconds
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <div className="approverlist align-items-center d-flex mt-2">
                {loading ? (
                    <>
                        {/* Skeleton for User Image */}
                        
                        {/* Skeleton for User Info */}
                        <div className="roles ps-2" style={{ flex: 1 }}>
                           
                        </div>
                        <div className="userimages">
                        <Skeleton
                            circle={true}
                            height={40}
                            width={40}
                            containerClassName="userimages"
                        />
                        </div>
                        <div className="roles ps-2">
                        <Skeleton height={20} width={120} className="mb-1 ms-2" />
                        <Skeleton height={16} width={80} className="mb-1 ms-2" />
                            <p
                                className="mb-0 cursorPointer para pe-3 d-sm-none d-block"
                                style={{ color: useColors.themeRed }}
                            >
                                 <Skeleton height={16} width={80} className="mb-1 ms-2" />
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Render Actual Content */}
                        <div className="userimages">
                            <ImageComponent
                                width={50}
                                height={50}
                                user={"/assets/img/Ellipse 14.svg"}
                            />
                        </div>
                        <div className="roles ps-2">
                            <h5 className="para textheader mb-0">Thamiz Arasan</h5>
                            <p className="para2 mb-0 mt-1 shade">CEO</p>
                            <p
                                className="mb-0 cursorPointer para pe-3 d-sm-none d-block"
                                style={{ color: useColors.themeRed }} >
                                Supervisee
                            </p>
                        </div>
                    </>
                )}
            </div>

        </>
    );
}

export default Menulistitem;
