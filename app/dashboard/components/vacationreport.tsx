import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Colors } from "@/app/reusableComponent/styles";
import ImageComponent from "@/app/reusableComponent/image";

function Vacationreport() {
    const useColors = Colors();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching with a delay
        const timer = setTimeout(() => setLoading(false), 2000); // Adjust timeout as needed
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center">
                <p className="textheader heading2 mb-0 fw-bold">Vacation report</p>
                {loading ? (
                    <Skeleton circle={true} height={40} width={40} />
                ) : (
                    <ImageComponent width={40} height={40} user={"/assets/img/Vacation.svg"} />
                )}
            </div>

            {/* Content Section */}
            <div>
                {loading
                    ? // Skeleton Loader for Vacation Reports
                    Array(3)
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
                                <Skeleton height={16} width={60} />
                            </div>
                        ))
                    : // Render Actual Vacation Reports
                    [
                        {
                            name: "David Mechkam",
                            role: "HR",
                            status: "Today",
                        },
                        {
                            name: "John Doe",
                            role: "Manager",
                            status: "Tomorrow",
                        },
                        {
                            name: "Jane Smith",
                            role: "Developer",
                            status: "Today",
                        },
                    ].map((report, index) => (
                        <div
                            key={index}
                            className="d-flex mt-3 justify-content-between align-items-center pb-2"
                        >
                            <div className="d-flex align-items-center">
                                <div className="userimages">
                                    <ImageComponent
                                        width={40}
                                        height={40}
                                        user={"/assets/img/todo.svg"}
                                    />
                                </div>
                                <div className="ps-2">
                                    <h5 className="para2 textheader mb-0">{report.name}</h5>
                                    <p className="shade para2 mb-0">{report.role}</p>
                                </div>
                            </div>
                            <p
                                className="para2 mb-0 text-center w-20"
                                style={{ color: useColors.themeRed }}
                            >
                                {report.status}
                            </p>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default Vacationreport;
