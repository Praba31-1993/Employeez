import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ImageComponent from "@/app/reusableComponent/image";
import { Colors } from "../../reusableComponent/styles";

interface MenulistforbirthdayworkvacationProps {
    headerImage: any;
    title: string;
    items: any;
    isSalesReport?: boolean;
    lastmonthReport?: string;
}

function Menulistforbirthdayworkvacation({
    headerImage,
    title,
    items,
    isSalesReport,
    lastmonthReport,
}: MenulistforbirthdayworkvacationProps) {
    const useColors = Colors();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a delay for fetching data
        const timer = setTimeout(() => setLoading(false), 2000); // Adjust timeout as needed
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center">
                <p className="textheader heading2 mb-0 fw-bold">{title}</p>

                {!isSalesReport && (
                    loading ? (
                        <Skeleton circle={true} height={40} width={40} />
                    ) : (
                        <ImageComponent width={0} height={0} user={headerImage} />
                    )
                )}
            </div>

            {/* Items Section */}
            <div>
                {loading
                    ? // Skeleton loader for items
                    Array(2)
                        .fill(null)
                        .map((_, index) => (
                            <div key={index} className="d-flex mt-3 justify-content-between align-items-center pb-2">
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
                    : // Render actual items
                    items?.map((bday: any, index: number) => (
                        <div key={index}>
                            <div className="d-flex mt-3 justify-content-between align-items-center pb-2">
                                <div className="d-flex align-items-center">
                                    <div className="userimages">
                                        <ImageComponent
                                            width={0}
                                            height={0}
                                            user={"/assets/img/Ellipse 14.svg"}
                                        />
                                    </div>
                                    <div className="ps-2">
                                        <h5 className="para2 textheader mb-0">{bday?.name}</h5>
                                        <p className="shade para2 mb-0">
                                            {isSalesReport ? bday?.sales : bday?.role}
                                        </p>
                                    </div>
                                </div>
                                <p
                                    className="para2 mb-0 text-center w-20"
                                    style={{ color: useColors.themeRed }}
                                >
                                    {bday?.day}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Menulistforbirthdayworkvacation;
