import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Colors } from "@/app/reusableComponent/styles";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ImageComponent from "@/app/reusableComponent/image";

function Inineverify() {
    const useColors = Colors();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating data fetching
        const timer = setTimeout(() => setLoading(false), 2000); // Adjust the timeout as necessary
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center">
                <p className="textheader heading2 mb-0 fw-bold">I-9 Verify</p>
            </div>

            {/* Content Section */}
            <div>
                {loading
                    ? // Skeleton Loader for the Items
                    Array(2)
                        .fill(null)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="d-flex mt-3 justify-content-between align-items-center pb-2"
                            >
                                <div className="d-flex align-items-center">
                                    <Skeleton
                                        circle={true}
                                        height={40}
                                        width={40}
                                        className="me-2"
                                    />
                                    <div className="ps-2">
                                        <Skeleton height={20} width={150} className="mb-1" />
                                        <Skeleton height={16} width={100} />
                                    </div>
                                </div>
                                <Skeleton height={16} width={120} />
                            </div>
                        ))
                    : // Render Actual Content
                    [
                        {
                            name: "David Mechkam",
                            role: "HR",
                            date: "10/11/2024",
                        },
                        {
                            name: "John Doe",
                            role: "Manager",
                            date: "15/11/2024",
                        },
                    ].map((person, index) => (
                        <div
                            key={index}
                            className="d-flex mt-3 justify-content-between align-items-center pb-2"
                        >
                            <div className="d-flex align-items-center">
                                <div className="userimages">
                                    <ImageComponent
                                        width={40}
                                        height={40}
                                        user={"/assets/img/Ellipse 14.svg"}
                                    />
                                </div>
                                <div className="ps-2">
                                    <h5 className="para2 textheader mb-0">{person.name}</h5>
                                    <p className="shade para2 mb-0">{person.role}</p>
                                </div>
                            </div>
                            <p
                                className="para2 mb-0 text-center d-flex align-items-center w-20"
                                style={{ color: useColors.themeRed }}
                            >
                                <HourglassBottomIcon className="pe-1" /> {person.date}
                            </p>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default Inineverify;
