"use client";
import React, { useState, useEffect } from "react";
import BreadcrumbsComponent from "../reusableComponent/breadcrumbs";
import DropdownComponent from "../reusableComponent/dropdown";
import { timeOff } from "../reusableComponent/JsonData";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Colors } from "@/app/reusableComponent/styles";
import Requesttimeoff from "./components/requesttimeoff";
import Reporteee from "./components/reporteee";
import Sidebar from "../sidebar/page";

export default function TimeOff() {
  const [selectedTimeOff, setSelectedTimeOff] = useState("");
  const role: string = useSelector((state: RootState) => state.role.role);
  const useColors = Colors(); // Declare useColors once

  // Set default value for selectedTimeOff only once
  useEffect(() => {
    if (selectedTimeOff === "") {
      setSelectedTimeOff("Request Time Off");
    }
  }, []);

  return (
    <div>
      <Sidebar>
        {/* <BreadcrumbsComponent
          selectedTab={
            selectedTimeOff === "" ? "Request Time Off" : selectedTimeOff
          }
        /> */}
        <div className="conatiner-fluid mb-3">
          <div className="row">
            <div className="col-6">
              <p className="textheader heading my-2">Time off</p>
            </div>

            {/* Dropdown to select time off options, displayed based on role */}
            {(role === "SM" || role === "SA" || role === "M") && (
              <div className="col-6 text-end">
                <DropdownComponent
                  dropdownlist={timeOff}
                  selectedDatafunction={(data: any) => setSelectedTimeOff(data)}
                  color={useColors.themeRed}
                />
              </div>
            )}

            {selectedTimeOff === "Request Time Off" ||
              selectedTimeOff === "" ? (
              <Requesttimeoff />
            ) : (
              <>
                {(role === "SM" || role === "SA" || role === "M") && (
                  <div className="w-100 ">
                    <Reporteee />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
