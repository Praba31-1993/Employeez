import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Circle from "@/app/reusableComponent/circle";

function Pendinginvoice() {
    const arrayList = [
        { invoicename: "Weekly", fill: "#16B1FF", value: 400 },
        { invoicename: "Fortnightly", fill: "#FFB300", value: 300 },
        { invoicename: "Monthly", fill: "#FF4C51", value: 300 },
        { invoicename: "Custom", fill: "#6C63FF", value: 200 },
    ];

    return (
        <>
            <div className="d-flex justify-content-between">
                <p className="textheader heading2">Pending Invoices</p>
                <select
                    className="form-select form-select-lg mb-3 cursorPointer para2"
                    aria-label=".form-select-lg example"
                    style={{ width: "fit-content" }}
                >
                    <option selected>Select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <div className="row">
                <div className="col-lg-12 col-xxl-6">
                <div className="chart-container d-flex justify-content-between">
                    <PieChart
                        series={[
                            {
                                data: arrayList.map(item => ({
                                    id: item.invoicename,
                                    value: item.value,
                                    color: item.fill, // Optional: If your library supports custom colors
                                })),
                                innerRadius: 60,
                                outerRadius: 100,
                                startAngle: 0,
                                endAngle: 360,
                            },
                        ]}
                    />
                </div>
                </div>
                
                <div className="col-lg-12 col-xxl-6" style={{alignSelf:"center"}}>
                    <div className="row ">
                        {arrayList.map((list, index) => (
                            <div key={index} className="col-6 ">
                                <div className="d-flex ps-4 justify-content-between ">
                                    <div>
                                        <p className="mb-0">
                                            <span className="pe-2 para">
                                                <Circle fill={list.fill} />
                                            </span>
                                            {list.invoicename}
                                        </p>
                                        <p className="mb-0 ps-3">12</p>
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

export default Pendinginvoice;
