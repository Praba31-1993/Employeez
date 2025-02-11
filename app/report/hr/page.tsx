"use client";
import DropdownComponent from "@/app/reusableComponent/dropdown";
import React, { useState } from "react";
import BreadcrumbsComponent from "@/app/reusableComponent/breadcrumbs";
import { hrrepots } from "../../reusableComponent/JsonData";
import { Colors } from "@/app/reusableComponent/styles";
import Sidebar from "@/app/sidebar/page";
import Comp_history from "./components/comp_history";

function Hr_report() {
    const useColors = Colors(); // Declare useColors once
    const [selectedTimeOff, setSelectedTimeOff] = useState("");
    return (
        <div>
            <Sidebar>
                <BreadcrumbsComponent
                    selectedTab={
                        selectedTimeOff === "" ? "Vacation report" : selectedTimeOff
                    }
                />
                <div className="row">
                    <div className="col-6">
                        <p className="textheader heading my-2">Hr report</p>
                    </div>
                    <div className="col-6 text-end">
                        <DropdownComponent
                            dropdownlist={hrrepots}
                            color={useColors.themeRed}
                            selectedDatafunction={(data: any) => setSelectedTimeOff(data)}
                        />
                    </div>

                </div>
                <div className="container-fluid">
                    <Comp_history />
                </div>
            </Sidebar>
        </div>
    );
}

export default Hr_report;
