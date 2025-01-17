import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Dataset with individual colors for each bar
const arrayList = [
    { id: 1, hractionlist: "Prehire", value: 55, fill: "#FFBA27" },
    { id: 2, hractionlist: "Hiring", value: 26, fill: "#41A4FF" },
    { id: 3, hractionlist: "Onboarding", value: 108, fill: "#00FF47" },
    { id: 4, hractionlist: "Supplier Onboarding", value: 22, fill: "#935AFF" },
];

const chartSetting = {
    xAxis: [
        {
            label: 'Value',
        },
    ],
    width: 500,
    height: 300,
};

// Reverse the array for the chart
const arrayLists = arrayList.reverse();

export default function HorizontalBars() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating data fetching with a delay
        const timer = setTimeout(() => setLoading(false), 2000); // Adjust delay as needed
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{ overflowX: "auto", width: "100%" }}>
            {loading ? (
                // Render skeleton loader before data is loaded
                <>
                    <Skeleton height={50} width={500} /><Skeleton height={50} width={500} /><Skeleton height={50} width={500} /><Skeleton height={50} width={500} /></>
            ) : (
                // Render the actual BarChart once data is loaded
                <BarChart
                    dataset={arrayLists} // Pass the entire dataset to the chart
                    yAxis={[
                        {
                            scaleType: "band",
                            dataKey: "id", // Use 'hractionlist' for Y-axis labels
                        },
                    ]}
                    series={[
                        {
                            dataKey: "value", // Set the value key for bar height
                        },
                    ]}
                    layout="horizontal"
                    {...chartSetting}
                />
            )}
        </div>
    );
}
