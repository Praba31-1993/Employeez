"use client";
import React from "react";
import BreadcrumbsComponent from "../reusableComponent/breadcrumbs";
import Sidebar from "../sidebar/page";
import DropdownComponent from "../reusableComponent/dropdown";
import { timeOff, TimeOffRequestList } from "../reusableComponent/JsonData";
import Requesttimeoff from "./requesttimeoff";
import Reporteee from "./reporteee";

export default function TimeOff() {
    return (
        <div>
            <Sidebar>
                <BreadcrumbsComponent />
                <div className="row ">
                    <div className="col-6">
                        <p className=" textheader heading my-2">Time off</p>
                    </div>
                    <div className="col-6 text-end" >
                        <DropdownComponent dropdownlist={timeOff} />
                    </div>
                </div>
                {/* <div className="d-flex gap-3 mb-3 w-100 flex-wrap">
                    <Requesttimeoff />
                </div> */}
                <Reporteee />
            </Sidebar>
        </div>
    )
}


