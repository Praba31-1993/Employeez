import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Colors } from "@/app/reusableComponent/styles";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import DownhillSkiingOutlinedIcon from "@mui/icons-material/DownhillSkiingOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

interface PolicyprocedureProps {
    isManagerScreen?: boolean;
}

function Policyprocedure({ isManagerScreen }: PolicyprocedureProps) {
    const [loading, setLoading] = useState(true);
    const useColors = Colors();

    useEffect(() => {
        // Simulating data loading
        const timer = setTimeout(() => setLoading(false), 2000); // Adjust the delay as necessary
        return () => clearTimeout(timer);
    }, []);

    const renderPolicyItems = (screenType: string) => {
        const items = [
            { icon: <AccountBalanceOutlinedIcon className="m-1 text-white" />, title: "Federal holiday", bgColor: "#FFCC5F", color: "#FFBA27" },
            { icon: <DownhillSkiingOutlinedIcon className="m-1 text-white" />, title: "Vacation policy", bgColor: "#6C63FF", color: "#41A4FF" },
            { icon: <ApartmentOutlinedIcon className="m-1 text-white" />, title: "Marvel", bgColor: "#16B1FF", color: "#00FF47" },
            { icon: <AutoStoriesOutlinedIcon className="m-1 text-white" />, title: "Handbook", bgColor: "#FFB054", color: "#935AFF" },
        ];

        return items.map((item, index) => (
            <div className={`col-lg-12 ${screenType} mt-3`} key={index}>
                <div className="d-flex align-items-center">
                    <div
                        className="headingicons rounded"
                        style={{
                            background: item.bgColor,
                            height: "fit-content",
                            width: "fit-content",
                        }}
                    >
                        {item.icon}
                    </div>
                    <div>
                        <h5 className="para textheader ps-2 mb-0 ">{item.title}</h5>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <>
            {loading ? (
                <div className="row justify-content-between">
                    <div className="col-lg-12 col-xxl-2 mt-3">
                        <Skeleton width={40} height={40} circle={true} />
                        <Skeleton width={120} height={20} className="mt-2" />
                    </div>
                    <div className="col-lg-12 col-xxl-2 mt-3">
                        <Skeleton width={40} height={40} circle={true} />
                        <Skeleton width={120} height={20} className="mt-2" />
                    </div>
                    <div className="col-lg-12 col-xxl-2 mt-3">
                        <Skeleton width={40} height={40} circle={true} />
                        <Skeleton width={120} height={20} className="mt-2" />
                    </div>
                    <div className="col-lg-12 col-xxl-2 mt-3">
                        <Skeleton width={40} height={40} circle={true} />
                        <Skeleton width={120} height={20} className="mt-2" />
                    </div>
                    <div className="col-lg-12 col-xxl-2 mt-3">
                        <Skeleton width={40} height={40} circle={true} />
                        <Skeleton width={120} height={20} className="mt-2" />
                    </div>
                </div>
            ) : (
                // Render actual content once loading is complete
                <div className="row justify-content-between">
                    {isManagerScreen ? renderPolicyItems("col-xxl-2") : renderPolicyItems("col-xxl-6")}
                </div>
            )}
        </>
    );
}

export default Policyprocedure;
