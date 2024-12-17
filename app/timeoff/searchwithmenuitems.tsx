"use client";
import React from "react";
import "./timeoff.css";

import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import FilterListIcon from "@mui/icons-material/FilterList";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import HistoryIcon from "@mui/icons-material/History";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DropdownComponent from "../reusableComponent/dropdown";
import { year } from "../reusableComponent/JsonData";
import search from "@/public/assets/img/search.svg";
import ImageComponent from "../reusableComponent/image";
import SearchIcon from '@mui/icons-material/Search';
import TableWithSort from "../reusableComponent/table/tablewithSort";
function Searchwithmenuitems() {
  const columns = [
    { key: "employeeID", label: "Employee ID" },
    { key: "employeename", label: "Employee Name" },
    { key: "date_from", label: "Date From" },
    { key: "date_to", label: "Date To" },
    { key: "time_off_type", label: "Time off Type" },
    { key: "status", label: "Status" },
    { key: "reason", label: "Reason" },
    { key: "action", label: "Action" },
  ];
  
  const rows = [
    {
      employeeID: "SR389",
      employeename: "Rajan",
      date_from: "2024-12-03",
      date_to: "2024-12-04",
      time_off_type: "Sick Leave",
      status: "Approved",
      reason: "Medical",
      action: "",
    },
    {
      employeeID: "SR390",
      employeename: "Anita",
      date_from: "2024-12-05",
      date_to: "2024-12-06",
      time_off_type: "Casual Leave",
      status: "Pending",
      reason: "Family Function",
      action: "",
    },
    {
      employeeID: "SR391",
      employeename: "Vikram",
      date_from: "2024-11-28",
      date_to: "2024-11-29",
      time_off_type: "Annual Leave",
      status: "Rejected",
      reason: "Not Enough Balance",
      action: "",
    },
    {
      employeeID: "SR392",
      employeename: "Divya",
      date_from: "2024-12-10",
      date_to: "2024-12-12",
      time_off_type: "Maternity Leave",
      status: "Approved",
      reason: "Pregnancy",
      action: "",
    },
    {
      employeeID: "SR393",
      employeename: "Suraj",
      date_from: "2024-12-01",
      date_to: "2024-12-02",
      time_off_type: "Paternity Leave",
      status: "Approved",
      reason: "Newborn Baby",
      action: "",
    },
    {
      employeeID: "SR394",
      employeename: "Meera",
      date_from: "2024-12-20",
      date_to: "2024-12-25",
      time_off_type: "Annual Leave",
      status: "Pending",
      reason: "Vacation",
      action: "",
    },
    {
      employeeID: "SR395",
      employeename: "Gokul",
      date_from: "2024-11-15",
      date_to: "2024-11-18",
      time_off_type: "Sick Leave",
      status: "Approved",
      reason: "Fever and Cold",
      action: "",
    },
    {
      employeeID: "SR396",
      employeename: "Priya",
      date_from: "2024-12-18",
      date_to: "2024-12-22",
      time_off_type: "Vacation Leave",
      status: "Pending",
      reason: "Travel",
      action: "",
    },
    {
      employeeID: "SR397",
      employeename: "Manoj",
      date_from: "2024-12-07",
      date_to: "2024-12-07",
      time_off_type: "Half-Day Leave",
      status: "Approved",
      reason: "Personal Work",
      action: "",
    },
    {
      employeeID: "SR398",
      employeename: "Anjali",
      date_from: "2024-12-12",
      date_to: "2024-12-12",
      time_off_type: "Compensatory Off",
      status: "Approved",
      reason: "Worked on Weekend",
      action: "",
    },
    {
      employeeID: "SR399",
      employeename: "Rahul",
      date_from: "2024-12-30",
      date_to: "2024-12-31",
      time_off_type: "Casual Leave",
      status: "Pending",
      reason: "Family Visit",
      action: "",
    },
    {
      employeeID: "SR400",
      employeename: "Kavya",
      date_from: "2024-12-22",
      date_to: "2024-12-22",
      time_off_type: "Half-Day Leave",
      status: "Approved",
      reason: "Doctor Appointment",
      action: "",
    },
    {
      employeeID: "SR401",
      employeename: "Aditya",
      date_from: "2024-12-01",
      date_to: "2024-12-03",
      time_off_type: "Sick Leave",
      status: "Approved",
      reason: "Flu and Fever",
      action: "",
    },
    {
      employeeID: "SR402",
      employeename: "Sanjana",
      date_from: "2024-12-25",
      date_to: "2024-12-27",
      time_off_type: "Casual Leave",
      status: "Rejected",
      reason: "High Workload",
      action: "",
    },
    {
      employeeID: "SR403",
      employeename: "Arjun",
      date_from: "2024-12-26",
      date_to: "2024-12-28",
      time_off_type: "Annual Leave",
      status: "Approved",
      reason: "Year-End Vacation",
      action: "",
    },
    {
      employeeID: "SR404",
      employeename: "Neha",
      date_from: "2024-12-15",
      date_to: "2024-12-15",
      time_off_type: "Compensatory Off",
      status: "Approved",
      reason: "Worked on Holiday",
      action: "",
    },
    {
      employeeID: "SR405",
      employeename: "Ramesh",
      date_from: "2024-12-04",
      date_to: "2024-12-05",
      time_off_type: "Sick Leave",
      status: "Pending",
      reason: "Medical Checkup",
      action: "",
    },
    {
      employeeID: "SR406",
      employeename: "Sridevi",
      date_from: "2024-12-08",
      date_to: "2024-12-08",
      time_off_type: "Half-Day Leave",
      status: "Approved",
      reason: "Bank Work",
      action: "",
    },
    {
      employeeID: "SR407",
      employeename: "Karthik",
      date_from: "2024-12-02",
      date_to: "2024-12-06",
      time_off_type: "Annual Leave",
      status: "Approved",
      reason: "Vacation",
      action: "",
    },
    {
      employeeID: "SR408",
      employeename: "Harini",
      date_from: "2024-12-09",
      date_to: "2024-12-11",
      time_off_type: "Sick Leave",
      status: "Approved",
      reason: "Back Pain",
      action: "",
    },
  ];
  
  return (
    <>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-md-9">
            <ul className="d-flex flex-wrap gap-2 heading2 textheader cursorPointer">
              <li className="d-flex align-items-center">
                <CalendarViewWeekIcon />
                <span className="mx-2">Column</span>
              </li>
              <li className="d-flex align-items-center">
                <FilterListIcon />
                <span className="mx-2">Filters</span>
              </li>
              <li className="d-flex align-items-center">
                <SaveAltIcon />
                <span className="mx-2">Export</span>
              </li>
              <li className="d-flex align-items-center">
                <HistoryIcon />
                <div className="ms-2" style={{ marginTop: "-5px" }}>
                  <DropdownComponent dropdownlist={year} />
                </div>
              </li>
              <li className="d-flex align-items-center">
                <CalendarMonthIcon />
                <div className="ms-2" style={{ marginTop: "-5px" }}>
                  <DropdownComponent dropdownlist={year} />
                </div>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-3 mt-3 mt-md-0">
            <div className="d-flex gap-1 searchbar p-2 align-items-center">
              <div className="mt-1">
                <SearchIcon/>
              </div>
              <input type="text" placeholder="Search" className="p-2 w-100" />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
          <TableWithSort columns={columns} rows={rows} dataforicons={false}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Searchwithmenuitems;
