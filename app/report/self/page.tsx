"use client";

import React, { useState } from "react";
import BreadcrumbsComponent from "@/app/reusableComponent/breadcrumbs";
import DropdownComponent from "@/app/reusableComponent/dropdown";
import { selfrepots } from "../../reusableComponent/JsonData";
import { Colors } from "@/app/reusableComponent/styles";
import Changerequest from "../components/changerequest/changerequest";
import Sidebar from "@/app/sidebar/page";
import Vacationreport from "../components/report_vacationreports/reportvacationreport";

function Self() {
  const useColors = Colors(); // Declare useColors once
  const [selectedTimeOff, setSelectedTimeOff] = useState("");

  console.log("selectedTimeOff", selectedTimeOff);

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
      <div>
        {selectedTimeOff === "Vacation report" && <Vacationreport />}
        {selectedTimeOff === "Change report" && <Changerequest />}
      </div>
    </Sidebar>
  );
}

export default Self;
