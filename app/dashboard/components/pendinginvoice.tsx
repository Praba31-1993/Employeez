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
            <div className="row" style={{alignItems:"center"}}>
                <div className="col-8">
                    <p className="textheader mb-0 heading2">Pending Invoices</p>
                </div>
                <div className="col-4 text-left">
                    <select
                        className="form-select form-select-lg mb-0 ps-2 p-0 textheader cursorPointer para2"
                        aria-label=".form-select-lg example"
                        style={{  boxShadow: "unset ", backgroundColor: "transparent" }}
                    >
                        <option value="0" >Select</option>
                        <option value="1" >One</option>
                        <option value="2" >Two</option>
                        <option value="3" >Three</option>
                    </select>
                </div>
            </div>


            <div className="row w-100 pb-2 h-100 align-items-center m-0">
                <div className="col-lg-7 col-xxl-6">
                    <div className="chart-wrapper" style={{ width: "100%", height: "200px" }}>
                        <Piechart data={arrayList} />
                    </div>
                </div>

                <div className="col-lg-5 px-0 col-xxl-6" style={{ alignSelf: "center" }}>
                    <div className="d-flex flex-wrap justify-content-between justify-content-lg-start  gap-xxl-4">
                        {arrayList.map((list, index) => (
                            <div key={index} >
                                <div className=" mt-2 ps-lg-1">
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
                    data: data?.map((item) => ({
                        id: item.invoicename,
                        value: item.value,
                        color: item.fill,
                        key: item.invoicename,
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
