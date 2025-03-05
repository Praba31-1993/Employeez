import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import { Colors } from "@/app/reusableComponent/styles";

function ProjectExtension() {
    const useColors = Colors();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating data fetch
        const timer = setTimeout(() => setLoading(false), 2000); // Adjust as necessary
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center">
                <p className="textheader heading2 mb-0 fw-bold"> Project extension</p>
            </div>

            {/* Content Section */}
            <div>
                {loading
                    ? // Skeleton loader for items
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
                                        <Skeleton height={10} width={150} className="" />
                                        <Skeleton height={10} width={200} className="" />
                                        <Skeleton height={10} width={120} />
                                    </div>
                                </div>
                            </div>
                        ))
                    : // Render actual content
                    [
                        {
                            name: "Project 1",
                            description: "Imran development project",
                            date: "10/11/2024",
                        },
                        {
                            name: "Project 2",
                            description: "Ali software upgrade",
                            date: "15/11/2024",
                        },
                    ].map((project, index) => (
                        <div
                            key={index}
                            className="d-flex mt-3 justify-content-between align-items-center pb-2"
                        >
                            <div className="d-flex">
                                <div
                                    className="headingicons rounded-circle"
                                    style={{
                                        background: useColors.themeRed,
                                        height: "fit-content",
                                        width: "fit-content",
                                    }}
                                >
                                    <CategoryRoundedIcon className="m-1 text-white" />
                                </div>
                                <div className="ps-2">
                                    <h5 className="para2 textheader mb-0">{project.name}</h5>
                                    <p className="shade para2 mb-0">{project.description}</p>
                                    <p
                                        className="para2 mb-0 d-flex align-items-center"
                                        style={{ color: useColors.themeRed }}
                                    >
                                        <HourglassBottomIcon className="pe-2" /> {project.date}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default ProjectExtension;
