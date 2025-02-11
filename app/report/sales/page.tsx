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
import BarChartIcon from "@mui/icons-material/BarChart";
import BasicBars from "./componets/barChart";

function SalesReport() {
  const [salesReport, setSalesReport] = useState<any>();
  const [selectedTab, setSelectedTab] = useState<string>("T&M PO");
  const [selectedStatus, setStatusTab] = useState<string>("Active");
  const [hideChart, setHideChart] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [countPerPage, setCountForPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = salesTDMReport.length;
  const totalPages = Math.ceil(totalCount / countPerPage);
  const [pages, setPages] = useState([]);
  const useColors = Colors();
  const ActiveEmployees = salesTDMReport?.filter(
    (list: any) => list?.status === "InProgress"
  );
  const InactiveEmployees = salesTDMReport?.filter(
    (list: any) => list?.status === "Closed"
  );

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
        (list: any) => list?.status === "Closed"
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

  console.log('selected',selectedStatus);
  
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
                Total Employee{" "}
                <span style={{ color: "#8C57FF" }}>
                  {salesTDMReport?.length.toString().padStart(2, "0")}{" "}
                </span>
              </p>
              <p className="mn-0">
                Active Employee{" "}
                <span style={{ color: "#8C57FF" }}>
                  {ActiveEmployees?.length.toString().padStart(2, "0")}
                </span>
              </p>
              <p className="mn-0">
                Inactive Employee{" "}
                <span style={{ color: "#8C57FF" }}>
                  {InactiveEmployees?.length.toString().padStart(2, "0")}
                </span>
              </p>
            </div>

            <div className="d-flex gap-3 justify-content-between align-items-center mb-3 pe-3">
              <div className="d-flex gap-4">
                <select
                  name=""
                  id=""
                  className="para py-2 rounded"
                  style={{
                    color: useColors.themeRed,
                    border: `1px solid ${useColors.themeRed}`,
                    background: "transparent",
                  }}
                  onChange={(e)=>setStatusTab(e.target.value)}
                  value={selectedStatus}
                >
                  {statusList && statusList?.length > 0 ? (
                    statusList?.map((item: any, index: number) => (
                      <option
                        key={`${item.id}-${index}`}
                        value={item.label}
                        className="cursorPointer textheader"
                      >
                        {item.label}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No options available
                    </option>
                  )}
                </select>
                {selectedStatus === "Inactive" && <div>
                  <BarChartIcon
                    sx={{
                      color: useColors.themeRed,
                      background: "transparent",
                    }}
                    className="cursor-pointer"
                    onClick={() => setHideChart((p) => !p)}
                  />
                </div>}
              </div>

              <div className="d-flex justify-content-end gap-3 align-items-center">
                <div className="d-flex gap-3 ">
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

        {/* popup Screen */}
        <section
          className={`showpopup ${hideChart ? "showpopupactive" : ""}`}
          onClick={()=>setHideChart(false)}
        >
          <div
            className="summarysection  mx-auto px-2 py-2"
            style={{
              height: "fit-content",
              alignSelf: "center",
              width: "1000px",
              overflowY: "auto",
              borderRadius: "8px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container-fluid">
              <div className="row px-2">
                <div className="col-12">
                  <BasicBars close={()=>setHideChart(false)} />
                </div>
              </div>
              <div className="row mt-3 px-2"></div>
            </div>
          </div>
        </section>
      </Sidebar>
    </div>
  );
}

export default SalesReport;
