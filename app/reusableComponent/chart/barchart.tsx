import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

export default function BarChartComponent() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a delay for data loading
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{ overflowX: "auto", width: "100%" }}>
            {loading ? (
                <Skeleton height={350} width="100%" />
            ) : (
                <div>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: ["Jan", "Feb", "Mar", "Apr"] }]}
                        series={[
                            { data: [48.5, 50.0, 60.0, 45.0], color: "#56CA00" },
                            { data: [38.0, 35.0, 40.0, 32.0], color: "#8C57FF" },
                            { data: [20.0, 22.5, 25.0, 18.0], color: "#FFB300" },
                            { data: [5.0, 6.0, 7.0, 4.0], color: "#FE4343" },
                        ]}
                        height={350}
                    />
                </div>
            )}
        </div>
    );
}

export function Salesreport() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a delay for data loading
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const data = [
        {
            icon: <PieChartOutlinedIcon sx={{ color: "#56CA00" }} />,
            bgColor: "rgb(198 249 161)",
            amount: "$48,568.20",
            label: "Total sales",
        },
        {
            icon: <MonetizationOnOutlinedIcon sx={{ color: "#8C57FF" }} />,
            bgColor: "#8C57FF29",
            amount: "$38,453.25",
            label: "Total Income",
        },
        {
            icon: <CreditCardOutlinedIcon sx={{ color: "#FFB300" }} />,
            bgColor: "rgba(255, 204, 95, 0.30)",
            amount: "$2,453.45",
            label: "Total Expense",
        },
        {
            icon: <AccessTimeOutlinedIcon sx={{ color: "#FE4343" }} />,
            bgColor: "#FFD0D0",
            amount: "$2,453.45",
            label: "Total Pending",
        },
    ];

    return (
        <>
            {loading ? (
                <Skeleton height={30} width={150} className="mb-2" />
            ) : (
                <h5 className="heading2 textheader mb-0">$482.85k</h5>
            )}
            {loading ? (
                <Skeleton height={20} width={200} className="my-2" />
            ) : (
                <p className="para2 mb-0 my-2 shade">Last month balance $234.40k</p>
            )}
            <div className="mt-4 justify-content-between align-items-center pb-2">
                {loading
                    ? Array(4)
                        .fill(null)
                        .map((_, index) => (
                            <div className="d-flex mt-4" key={index}>
                                <Skeleton circle={true} height={40} width={40} />
                                <div className="ps-2">
                                    <Skeleton height={20} width={150} />
                                    <Skeleton height={16} width={100} className="mt-1" />
                                </div>
                            </div>
                        ))
                    : data.map((item, index) => (
                        <div className="d-flex mt-4" key={index}>
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
                            <div className="ps-2">
                                <h5 className="heading2 textheader mb-0">{item.amount}</h5>
                                <p className="para2 mb-0 shade d-flex align-items-center">
                                    {item.label}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}
