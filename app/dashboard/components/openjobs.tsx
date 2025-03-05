import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import ImageComponent from "@/app/reusableComponent/image";
import { Colors } from "@/app/reusableComponent/styles";

function Openjobs() {
    const useColors = Colors();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating a delay to fetch data
        const timer = setTimeout(() => setLoading(false), 2000); // Adjust the timeout as necessary
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center">
                <p className="textheader heading2 mb-0 fw-bold">Open jobs</p>
                {loading ? (
                    <Skeleton circle={true} height={40} width={40} />
                ) : (
                    <ImageComponent width={40} height={40} user={"/assets/img/openjobs.svg"} />
                )}
            </div>

            {/* Content Section */}
            <div>
                {loading
                    ? // Skeleton loader for job items
                    Array(2)
                        .fill(null)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="d-flex mt-3 justify-content-between align-items-center pb-2"
                            >
                                <div className="d-flex">
                                    <Skeleton
                                        circle={true}
                                        height={40}
                                        width={40}
                                        className="me-2"
                                    />
                                    <div className="ps-2">
                                        <Skeleton height={20} width={200} className="mb-1" />
                                        <Skeleton height={16} width={150} />
                                    </div>
                                </div>
                            </div>
                        ))
                    : // Render actual job items
                    [
                        {
                            title: "General manager, southfield",
                            date: "10/11/2024",
                        },
                        {
                            title: "Senior software engineer, remote",
                            date: "15/11/2024",
                        },
                    ].map((job, index) => (
                        <div
                            key={index}
                            className="d-flex mt-3 justify-content-between align-items-center pb-2"
                        >
                            <div className="d-flex">
                                <div
                                    className="headingicons rounded-circle"
                                    style={{
                                        background: "#8F88FF",
                                        height: "fit-content",
                                        width: "fit-content",
                                    }}
                                >
                                    <WorkOutlineRoundedIcon className="m-1 text-white" />
                                </div>
                                <div className="ps-2">
                                    <h5 className="para2 textheader mb-0">{job.title}</h5>
                                    <p className="para2 mb-0 shade d-flex align-items-center">
                                        <CalendarMonthRoundedIcon className="pe-2" /> {job.date}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default Openjobs;
