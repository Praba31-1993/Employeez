"use client"
import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/page";
import DropdownComponent from "../reusableComponent/dropdown";
import { Colors } from "@/app/reusableComponent/styles";
import SearchIcon from "@mui/icons-material/Search";
import { SearchLogic } from "../reusableComponent/commonlogic";
import { employeeListData } from "../reusableComponent/JsonData";
import WorkIcon from "@mui/icons-material/Work";
import EmployeeCard from "./employeecard";

export interface Employee {
  employeeId: string;
  status: string;
  name: string;
  role: string;
  department: string;
  manager: string;
  mobile_number: string;
  email: string;
  joined_date: string;
}

function EmployeeList() {
  const [selectedTab, setSelectedTab] = useState("Employee List");
  const [search, setSearch] = useState<string>("");
  const [rowsList, setRows] = useState<Employee[]>(employeeListData);
  const [role, setRole] = useState<string | null>(null); 
  const [isClient, setIsClient] = useState(false); // ✅ Ensure Client-Side Check
  const useColors = Colors();

  const tabs = [
    { id: 1, label: "Select Department" },
    { id: 2, label: "Super Admin" },
    { id: 3, label: "HR" },
  ];

  // ✅ Ensure `localStorage` runs only on the client
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const userRole = localStorage.getItem("Role");
      setRole(userRole);
    }
  }, []);

  useEffect(() => {
    if (role === "E") {
      setRows([]);
    } else {
      setRows(employeeListData);
    }
  }, [role]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);
    const res = SearchLogic(employeeListData, query);
    setRows(res);
  };

  return (
    <div>
      <Sidebar>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <p className="textheader heading my-2">Employee List</p>
            </div>
          </div>
          {/* Search Field */}
          <div className="row">
            <div className="col-12 col-xxl-9 col-md-9 p-0">
              <div className="d-flex gap-1">
                <WorkIcon sx={{ mt: 1 }} />
                <DropdownComponent
                  dropdownlist={tabs}
                  selectedDatafunction={(data: any) => setSelectedTab(data)}
                  color={useColors.themeRed}
                />
              </div>
            </div>
            <div className="col-12 col-xxl-3 col-md-3 p-0">
              <div className="d-flex gap-1 w-100 searchbar ps-2 align-items-center">
                <div className="mt-1">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="p-2 w-100"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          {/* ✅ Render UI only after `isClient` is true */}
          {isClient && (
            <div className="row">
              {rowsList.length > 0 &&
                rowsList.map((employee: Employee) => (
                  <div
                    className="col-12 col-md-6 col-xxl-3 g-3"
                    key={employee.employeeId}
                    style={{ height: "fit-content" }}
                  >
                    <EmployeeCard employeelist={employee} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </Sidebar>
    </div>
  );
}

export default EmployeeList;
