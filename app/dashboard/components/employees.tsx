import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Circle from "@/app/reusableComponent/circle";
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

function Employees() {
    const [loading, setLoading] = useState(true);

    const arrayList = [
        { jobrole: "W2S", fill: "#16B1FF", value: 400 },
        { jobrole: "W2H", fill: "#FFB300", value: 300 },
        { jobrole: "C2C", fill: "#FF4C51", value: 300 },
        { jobrole: "Recent hires", fill: "#6C63FF", value: 200 },
    ];

    useEffect(() => {
        // Simulating a fetch delay
        const timer = setTimeout(() => setLoading(false), 2000); // Adjust the timeout as necessary
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Header */}
            <div className="row" style={{ alignItems: "center" }}>
                <div className="col-8">
                    <p className="textheader mb-0 heading2">Employees</p>
                </div>
                <div className="col-4 text-left">
                    <p className="shade mb-0 heading2 text-end ">Month/year</p>
                </div>
            </div>

            {/* Content */}
            <div className="row w-100 pb-2 h-100 align-items-center m-0">
                {/* PieChart Section */}
                <div className="col-lg-7 col-xxl-6">
                    <div
                        className="chart-wrapper"
                        style={{ width: "100%", height: "200px" }}
                    >
                        {loading ? (
                            <Skeleton
                                height={200}
                                width={200}
                                style={{ borderRadius: "50%" }}
                            />
                        ) : (
                            <Piechart data={arrayList} />
                        )}
                    </div>
                </div>

                {/* Labels Section */}
                <div
                    className="col-lg-5 px-0 col-xxl-6"
                    style={{ alignSelf: "center" }}
                >
                    <div className="row ">
                        <div className="col-12 pb-3 mb-1 rounded borderbottom">
                            <div className="d-flex align-items-center">
                                <div className="timesheetdetails p-3">
                                    <BadgeOutlinedIcon sx={{ color: "#8C57FF" }} />
                                </div>
                                <div>
                                    <h6 className="headin2 textheader">170</h6>
                                    <h6 className="para textheader">Total employees</h6>
                                </div>
                            </div>
                        </div>
                        {loading
                            ? Array(4)
                                .fill(null)
                                .map((_, index) => (
                                    <div key={index} className="mt-2 ps-lg-1">
                                        <Skeleton
                                            circle={true}
                                            height={16}
                                            width={16}
                                            className="me-2"
                                        />
                                        <Skeleton height={16} width={100} />
                                        <Skeleton height={12} width={50} className="mt-1" />
                                    </div>
                                ))
                            : arrayList.map((list, index) => (
                                <div className="col-6" key={index}>
                                    <div className="mt-2 ps-lg-1">
                                        <div>
                                            <p className="mb-0 textheader para">
                                                <span className="pe-2">
                                                    <Circle fill={list.fill} />
                                                </span>
                                                {list.jobrole}
                                            </p>
                                            <p className="mb-0 para2 ps-4 textheader">
                                                {list.value}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Employees;

export function Piechart({ data }: { data: any[] }) {
    return (
        <PieChart
            series={[
                {
                    data: data?.map((item) => ({
                        id: item.jobrole,
                        value: item.value,
                        color: item.fill,
                        key: item.jobrole,
                    })),
                    innerRadius: 50,
                    outerRadius: 90,
                },
            ]}
            width={10} // Adjust width
            height={300} // Adjust height
        />
    );
}
