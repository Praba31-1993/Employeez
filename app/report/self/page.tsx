"use client";

import Sidebar from "@/app/sidebar/page";
import React, { useState } from "react";
import BreadcrumbsComponent from "@/app/reusableComponent/breadcrumbs";
import DropdownComponent from "@/app/reusableComponent/dropdown";
import { selfrepots } from "../../reusableComponent/JsonData";
import { Colors } from "@/app/reusableComponent/styles";
import Vacationreport from "./vacationrepots/vacationreport";
import Changerequest from "./changerequest/changerequest";

function Self() {
  const useColors = Colors(); // Declare useColors once
  const [selectedTimeOff, setSelectedTimeOff] = useState("");

  return (
    <Sidebar>
      <BreadcrumbsComponent
        selectedTab={
          selectedTimeOff === "" ? "Vacation report" : selectedTimeOff
        }
      />
      <div className="row">
        <div className="col-6">
          <p className="textheader heading my-2">Self report</p>
        </div>
        <div className="col-6 text-end">
          <DropdownComponent
            dropdownlist={selfrepots}
            color={useColors.themeRed}
            selectedDatafunction={(data: any) => setSelectedTimeOff(data)}
          />
        </div>
      </div>
      <div className="row">
        {/* <Vacationreport /> */}
        {/* changerequest table */}
        <Changerequest />
      </div>
    </Sidebar>
  );
}

export default Self;
