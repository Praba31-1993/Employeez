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
                    className="form-select form-select-lg mb-3 textheader cursorPointer para2"
                    aria-label=".form-select-lg example"
                    style={{ width: "fit-content",boxShadow:"unset ",backgroundColor:"transparent" }}
                >
                    <option selected>Select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>

            <div className="row">
                <div className="col-lg-7 col-xxl-6">
                    <div className="chart-wrapper" style={{ width: "100%", height: "200px" }}>
                        <Piechart data={arrayList} />
                    </div>
                </div>

                <div className="col-lg-5 px-0 col-xxl-6" style={{ alignSelf: "center" }}>
                    <div className="row">
                        {arrayList.map((list, index) => (
                            <div key={index} className="col-lg-6 px-0 pt-3 ">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="mb-0 textheader para">
                                            <span className="pe-1 ">
                                                <Circle fill={list.fill} />
                                            </span>
                                            {list.invoicename}
                                        </p>
                                        <p className="mb-0 para2 ps-3 textheader">{list.value}</p>
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

export function Piechart({ data }: { data: any[] }) {
    return (
        <PieChart
            series={[
                {
                    data: data.map((item) => ({
                        id: item.invoicename,
                        value: item.value,
                        color: item.fill,
                    })),
                    innerRadius: 50,
                    outerRadius: 90,
                },
            ]}
            width={10}  // Adjust width
            height={300} // Adjust height
        />
    );
}
