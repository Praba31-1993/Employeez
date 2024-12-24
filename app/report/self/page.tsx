"use client";

import Sidebar from "@/app/sidebar/page";
import React from "react";
import BreadcrumbsComponent from "@/app/reusableComponent/breadcrumbs";
import DropdownComponent from "@/app/reusableComponent/dropdown";
import { selfrepots } from "../../reusableComponent/JsonData";
import { Colors } from "@/app/reusableComponent/styles";
import Vacationreport from "./vacationrepots/vacationreport";

function Self() {
    const useColors = Colors(); // Declare useColors once

    return (
        <Sidebar>
            <BreadcrumbsComponent />
            <div className="row">
                <div className="col-6">
                    <p className="textheader heading my-2">Self report</p>
                </div>
                <div className="col-6 text-end">
                    <DropdownComponent dropdownlist={selfrepots} color={useColors.themeRed} />
                </div>
            </div>
            <div className="row">
                <Vacationreport />
            </div>
        </Sidebar>
    );
}

export default Self;
