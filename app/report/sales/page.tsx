"use client";
import BreadcrumbsComponent from "@/app/reusableComponent/breadcrumbs";
import DropdownComponent from "@/app/reusableComponent/dropdown";
import Sidebar from "@/app/sidebar/page";
import React, { useState, useEffect, act } from "react";
import { Colors } from "@/app/reusableComponent/styles";
import SalesReportTable from "./componets/salesReportTable";
import { salesTDMReport } from "@/app/reusableComponent/JsonData";
import SearchIcon from "@mui/icons-material/Search";
import favourite from "@/public/assets/img/favourite.svg";
import {
  handleCSVExport1,
  SearchLogic,
} from "@/app/reusableComponent/commonlogic";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Image from "next/image";
import PaginationComponent from "@/app/reusableComponent/paginationcomponent";

function SalesReport() {
  const [salesReport, setSalesReport] = useState<any>();
  const [selectedTab, setSelectedTab] = useState<string>("T&M PO");
  const [selectedStatus, setStatusTab] = useState<string>("Active");
  const [search, setSearch] = useState<string>("");
  const [countPerPage, setCountForPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = salesTDMReport.length;
  const totalPages = Math.ceil(totalCount / countPerPage);
  const [pages, setPages] = useState([]);
  const useColors = Colors();
  const headersQuery: any = {
    "Employee Name": "conName",
    Company: "vndName",
    "Customer PO Number": "cust_PO_Number",
    "Start Date": "startDate",
    "End Date": "endDate",
    Rate: "rate",
    Margin: "margin",
    Closer: "dealCloser",
    Recruiter: "recruiter",
  };

  const tabs = [
    { id: 1, label: "T&M PO" },
    { id: 2, label: "Fixed PO" },
    { id: 3, label: "Internal PO" },
    { id: 4, label: "Commission" },
    { id: 5, label: "Employee Information" },
  ];

  const statusList = [
    { id: 20, label: "Active" },
    { id: 21, label: "Inactive" },
    { id: 22, label: "Both" },
  ];

  useEffect(() => {
    const arr: any = [];
    for (let i = 1; i <= totalPages; i++) {
      arr.push(i);
    }
    setPages(arr);
  }, [totalPages]);

  useEffect(() => {
    setCountForPerPage(5);
  }, []);

 

  const currentPageItems = salesReport?.slice(
    (currentPage - 1) * countPerPage,
    currentPage * countPerPage
  );

 

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (selectedStatus === "Active") {
      const activeStatus = salesTDMReport.filter(
        (list: any) => list?.status === "InProgress"
      );
      console.log("activeStatus", activeStatus);
      setSalesReport(activeStatus);
    } else if (selectedStatus === "Inactive") {
      const InactiveStatus = salesTDMReport.filter(
        (list: any) => list?.status === "Progress"
      );
      setSalesReport(InactiveStatus);
    } else {
      setSalesReport(salesTDMReport);
    }
  }, [selectedStatus]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);
    const res = SearchLogic(salesTDMReport, query);
    setSalesReport(res);
  };

  return (
    <div>
      <Sidebar>
        <BreadcrumbsComponent
          selectedTab={selectedTab === "" ? "T&M PO" : selectedTab}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 p-0">
              <p className="textheader heading my-2">Sales Report</p>
            </div>

            <div className="col-6 text-end mb-3">
              <DropdownComponent
                dropdownlist={tabs}
                selectedDatafunction={(data: any) => setSelectedTab(data)}
                color={useColors.themeRed}
              />
            </div>

            <div className="d-flex gap-5 heading2 textheader">
              <p className="mn-0">
                Total Employee <span style={{ color: "#8C57FF" }}>04</span>
              </p>
              <p className="mn-0">
                Active Employee <span style={{ color: "#8C57FF" }}>04</span>
              </p>
              <p className="mn-0">
                Inactive Employee <span style={{ color: "#8C57FF" }}>04</span>
              </p>
            </div>

            <div className="d-flex gap-3 justify-content-end pe-3">
              <div className="d-flex gap-3 mb-3">
                <Image src={favourite} alt="" width={24} height={24} />
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

              <div
                className="text-end mb-3"
                style={{
                  border: "1px solid rgb(204, 204, 204)",
                  // width: "100px",
                }}
              >
                <DropdownComponent
                  dropdownlist={statusList}
                  selectedDatafunction={(data: any) => setStatusTab(data)}
                  color={useColors.themeRed}
                />
              </div>
              <button
                className="outlinebtn rounded px-3 py-1"
                style={{
                  color: useColors.themeRed,
                  border: `1px solid ${useColors.themeRed}`,
                  height: "fit-content",
                }}
                onClick={() => handleCSVExport1(headersQuery, salesTDMReport)}
              >
                Export <SaveAltIcon className="ml-2" />
              </button>
            </div>

            {selectedTab === "T&M PO" || selectedTab === "" ? (
              <>
                <SalesReportTable salesData={currentPageItems} />
              </>
            ) : (
              ""
            )}

           
              <PaginationComponent
                currentPage={currentPage}
                currentPageFunction={handlePageChange}
                // pages={pages}
                totalPages={totalPages}
              />
           
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

export default SalesReport;
