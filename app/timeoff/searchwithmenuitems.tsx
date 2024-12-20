"use client";
import React, { useEffect, useState, useRef } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import TableWithSort from "../reusableComponent/table/tablewithSort";
import { Checkbox } from "@mui/material";
import { relative } from "path";
function Searchwithmenuitems() {
  const [ShowColumns, setShowColumns] = useState<boolean>(false);
  const [tableColumns, setTableColumns] = useState<any>();
  const [searchList, setSearchList] = useState<any>();
  const [tableRows, setTableRows] = useState<any>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const columnRef = useRef<HTMLDivElement>(null); // Ref for the column container


  const columns = [
    { id: 1, key: "employeeID", label: "Employee ID", checked: true },
    { id: 2, key: "employeename", label: "Employee Name", checked: false },
    { id: 3, key: "date_from", label: "Date From", checked: true },
    { id: 4, key: "date_to", label: "Date To", checked: true },
    { id: 5, key: "time_off_type", label: "Time off Type", checked: false },
    { id: 6, key: "status", label: "Status", checked: true },
    { id: 7, key: "reason", label: "Reason", checked: true },
    { id: 8, key: "action", label: "Action", checked: true },
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

  const handleChecked = (id: any) => {
    const updatedColumns = tableColumns.map((columnsList: any) => {
      if (columnsList.id === id) {
        return {
          ...columnsList,
          checked: !columnsList.checked,
        };
      }
      return columnsList;
    });
    setTableColumns(updatedColumns);
    setSearchList(updatedColumns);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (columnRef.current && !columnRef.current.contains(event.target as Node)) {
        setShowColumns(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setTableColumns(columns);
    setTableRows(rows);
    setSearchList(columns);
  }, []);

  return (
    <>
      <div
        className="container-fluid"
        // onClick={() => setShowColumns(!ShowColumns)}
      >
        <div className="">
          {ShowColumns && (
            <div
              className="dashboardcard"
              style={{
                padding: "10px",
                position: "absolute",
                top: "17em",
                width: "30%",
                zIndex: 1,
              }}
              ref={columnRef}
            >
              <div
                className="d-flex gap-1  p-2 align-items-center"
                style={{ border: "1px solid blue" }}
              >
                <div className="mt-1">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="p-2 w-100"
                  value={searchQuery}
                  onChange={handleSearch}
                  
                />
              </div>

              {searchList?.map((columnList: any) => (
                <div className="checkboxwithList" key={columnList?.id}>
                  <Checkbox
                    checked={columnList?.checked}
                    onChange={() => handleChecked(columnList?.id)}
                  />
                  <span>{columnList?.key}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="row justify-content-end">
          <div className="col-12 col-md-3 ">
            <div className="d-flex gap-1 searchbar ps-2 align-items-center">
              <div className="mt-1">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="p-2 w-100"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        <div className="row justify-content-between">
          <div className="col-12 col-md-6">
            <ul className="d-flex flex-wrap gap-2 heading2 textheader cursorPointer p-0">
              <li
                className="d-flex align-items-center"
                onClick={() => setShowColumns((prev) => !prev)}
              >
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
                <div className="ms-2">
                  <DropdownComponent dropdownlist={year} />
                </div>
              </li>
              <li className="d-flex align-items-center">
                <CalendarMonthIcon />
                <div className="ms-2">
                  <DropdownComponent dropdownlist={year} />
                </div>
              </li>
            </ul>
          </div>

          <div className="col-12">
            <TableWithSort
              columns={tableColumns}
              rows={tableRows}
              dataforicons={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Searchwithmenuitems;
