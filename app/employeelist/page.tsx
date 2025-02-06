"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/page";
import BreadcrumbsComponent from "../reusableComponent/breadcrumbs";
import DropdownComponent from "../reusableComponent/dropdown";
import { Colors } from "@/app/reusableComponent/styles";
import SearchIcon from "@mui/icons-material/Search";
import { SearchLogic } from "../reusableComponent/commonlogic";
import { employeeListData } from "../reusableComponent/JsonData";
import WorkIcon from "@mui/icons-material/Work";
import { Chip } from "@mui/material";
import EmployeeCard from "./employeecard";
import PaginationComponent from "../reusableComponent/paginationcomponent";

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
  const [countPerPage, setCountForPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = rowsList.length;
  const totalPages = Math.ceil(totalCount / countPerPage);
  const [pages, setPages] = useState([]);
  const useColors = Colors();

  const tabs = [
    { id: 1, label: "HR" },
    { id: 2, label: "Super Admin" },
    { id: 3, label: "Select Department" },
  ];

    useEffect(() => {
      const arr: any = [];
      for (let i = 1; i <= totalPages; i++) {
        arr.push(i);
      }
      setPages(arr);
    }, [totalPages]);


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    setSearch(query);
    const res = SearchLogic(employeeListData, query);

    setRows(res);
  };

  const currentPageItems = rowsList.slice(
    (currentPage - 1) * countPerPage,
    currentPage * countPerPage
  );


  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Sidebar>
        <BreadcrumbsComponent
          selectedTab={selectedTab === "" ? "Employee List" : selectedTab}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <p className="textheader heading my-2">Employee List</p>
            </div>
          </div>
          {/* Search Field */}
          <div className="row ">
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
          <div className="row">
            {currentPageItems?.length > 0 &&
              currentPageItems?.map((employee: any) => (
                <div
                  className="col-12 col-md-6 col-xxl-3 g-3 "
                  key={employee?.employeeId}
                  style={{ height: "fit-content" }}
                >
                  <EmployeeCard employeelist={employee} />
                </div>
              ))}
          </div>
        </div>
        <PaginationComponent
          currentPage={currentPage}
          currentPageFunction={handlePageChange}
          pages={pages}
          totalPages={totalPages}
        />
      </Sidebar>
    </div>
  );
}

export default EmployeeList;
