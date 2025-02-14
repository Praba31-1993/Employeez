"use client";

import React, { useState } from "react";
import BreadcrumbsComponent from "@/app/reusableComponent/breadcrumbs";
import DropdownComponent from "@/app/reusableComponent/dropdown";
import { selfrepots } from "../../reusableComponent/JsonData";
import { Colors } from "@/app/reusableComponent/styles";
import Sidebar from "@/app/sidebar/page";
import Vacationreport from "./components/report_vacationreports/reportvacationreport";
import Changerequest from "./components/changerequest/changerequest";
import Downloadreport from "./components/downloadreport";
import Punchinoutreport from "./components/punchinoutreport";
import Disciplinaryreport from "./components/disciplinaryreport";


function Self() {
  const useColors = Colors(); // Declare useColors once
  const [selectedTimeOff, setSelectedTimeOff] = useState("");

  console.log("selectedTimeOff", selectedTimeOff);

  return (
    <Sidebar>
      {/* <BreadcrumbsComponent
        selectedTab={
          selectedTimeOff === "" ? "Vacation report" : selectedTimeOff
        }
      /> */}
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
        {(selectedTimeOff === "" || selectedTimeOff === "Vacation report") && (
          <Vacationreport />
        )}
        {selectedTimeOff === "Change report" && <Changerequest />}
        {selectedTimeOff === "Download report" && <Downloadreport />}
        {selectedTimeOff === "Punch in/Out report" && <Punchinoutreport />}
        {selectedTimeOff === "Disciplinary report" && <Disciplinaryreport />}
      </div>
    </Sidebar>
  );
}

export default Self;
