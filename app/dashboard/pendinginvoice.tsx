import React from "react";
import DropdownComponent from "../reusableComponent/dropdown";
import InvoiceChartIcon from "@/app/assets/img/invoicechart.svg";
import Image from "next/image";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "./dashboard.css";
import { TextStyles } from "../reusableComponent/styles";
import Circle from "../reusableComponent/circle";

function Pendinginvoice() {
    const arrayList = [
        { invoicename: "Weekly", fill: "32", },
        { invoicename: "Fortnightly", fill: "11", },
        { invoicename: "Monthly", fill: "12", },
        { invoicename: "Custom", fill: "12", },
    ];
    return (
        <>

            <div className="d-flex justify-content-between ">
                <p className="textheader heading2">Pending Invoices</p>

                <select className="form-select form-select-lg mb-3   cursorPointer para2 " aria-label=".form-select-lg example" style={{ width: "fit-content" }}  >
                    <option selected>Select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>

            <div className="row para ">
                <div className="col-6 col-md-6" style={{alignSelf:"center"}}>
                    <Image src={InvoiceChartIcon} alt="chart" />
                </div>
                <div className="col-6 col-md-6 " style={{alignSelf:"center"}}>
                    <div className="row" >
                        {arrayList.map((list, index, array) => (
                            <div className="col-sm-12 col-md-6 mt-2">
                                <div key={index} className={`d-flex justify-content-between gap-3 `} >
                                    <div className="">
                                        <p className="mb-0"><span className="pe-2"><Circle /></span>{list.invoicename}</p>
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
