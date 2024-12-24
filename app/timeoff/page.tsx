"use client";
import React, { useState, useEffect } from "react";
import BreadcrumbsComponent from "../reusableComponent/breadcrumbs";
import Sidebar from "../sidebar/page";
import DropdownComponent from "../reusableComponent/dropdown";
import { timeOff, TimeOffRequestList } from "../reusableComponent/JsonData";
import Requesttimeoff from "./requesttimeoff";
import Reporteee from "./reporteee";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function TimeOff() {
  // State to store selected time off option
  const [selectedTimeOff, setSelectedTimeOff] = useState("");

  // Retrieve the role from the Redux store
  const role: string = useSelector((state: RootState) => state.role.role);

  // Log the selected time off for debugging purposes
  console.log("role", role);

  // Ensure we render the correct content based on selectedTimeOff and role

  return (
    <div>
      <Sidebar>
        <BreadcrumbsComponent />
        <div className="row">
          <div className="col-6">
            <p className="textheader heading my-2">Time off</p>
            {/* <p>{role}</p> */}
          </div>

          {/* Dropdown to select time off options, displayed based on role */}
          {(role === "SM" || role === "SA" || role === "M") && (
            <div className="col-6 text-end">
              <DropdownComponent
                dropdownlist={timeOff}
                selectedDatafunction={(data: any) => setSelectedTimeOff(data)}
              />
            </div>
          )}
        </div>

        {selectedTimeOff === "Request Time Off" || selectedTimeOff === "" ? (
          <div className="d-flex gap-3 mb-3 w-100 flex-wrap">
            <Requesttimeoff />
          </div>
        ) : (
          <>
            {(role === "SM" || role === "SA" || role === "M") && (
              <div className="d-flex gap-3 mb-3 w-100 flex-wrap">
                <Reporteee />
              </div>
            )}
          </>
        )}
      </Sidebar>
    </div>
  );
}
