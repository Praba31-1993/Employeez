"use client";
import DropdownComponent from "@/app/reusableComponent/dropdown";
import Sidebar from "@/app/sidebar/page1";
import React, { useState } from "react";
import BreadcrumbsComponent from "@/app/reusableComponent/breadcrumbs";
import { approverrepots } from "../../reusableComponent/JsonData";
import { Colors } from "@/app/reusableComponent/styles";
import Punchinoutapprover from "../components/punchinoutapprover";

function Approver() {
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
            <p className="textheader heading my-2">Approver report</p>
          </div>
          <div className="col-6 text-end">
            <DropdownComponent
              dropdownlist={approverrepots}
              color={useColors.themeRed}
              selectedDatafunction={(data: any) => setSelectedTimeOff(data)}
            />
          </div>
          <div className="">
            <Punchinoutapprover />
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

export default Approver;
