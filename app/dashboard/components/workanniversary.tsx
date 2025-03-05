import Image from "next/image";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import headerImage from "@/public/assets/img/anniversary.svg";
import { Colors } from "@/app/reusableComponent/styles";
import ImageComponent from "@/app/reusableComponent/image";
function Workanniversary() {
    const useColors = Colors();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating data fetch
        const timer = setTimeout(() => setLoading(false), 2000); // Adjust timeout as needed
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <p className="textheader heading2 mb-0 fw-bold"> Work anniversary </p>
                <Image src={headerImage} alt="" />
            </div>
            <div>
                {loading
                    ? // Skeleton Loader for the List Items
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
                                        <Skeleton height={20} width={150} />
                                        <Skeleton height={16} width={100} className="mt-1" />
                                    </div>
                                </div>
                                <Skeleton height={16} width={50} />
                            </div>
                        ))
                    : // Render Actual Content
                    [
                        {
                            name: "David Mechkam",
                            role: "HR",
                            status: "Today",
                        },
                        {
                            name: "David Mechkam",
                            role: "HR",
                            status: "Tomorrow",
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
                                        user={"/assets/img/todo.svg"}
                                    />
                                </div>
                                <div className="ps-2">
                                    <h5 className="para2 textheader mb-0">{person.name}</h5>
                                    <p className="shade para2 mb-0">{person.role}</p>
                                </div>
                            </div>
                            <p
                                className="para2 mb-0 text-center w-20"
                                style={{ color: useColors.themeRed }}
                            >
                                {person.status}
                            </p>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default Workanniversary;
