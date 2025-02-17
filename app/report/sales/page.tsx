"use client";
import DropdownComponent from "@/app/reusableComponent/dropdown";
import Sidebar from "@/app/sidebar/page";
import React, { useState, useEffect, act } from "react";
import { Colors } from "@/app/reusableComponent/styles";
import SalesReportTable from "./componets/salesReportTable";
import {
  salesTDMReport,
  getemployeeinformation,
} from "@/app/reusableComponent/JsonData";
import SearchIcon from "@mui/icons-material/Search";
import favourite from "@/public/assets/img/favourite.svg";
import {
  handleCSVExport1,
  handleExcelExport,
  SearchLogic,
} from "@/app/reusableComponent/commonlogic";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Image from "next/image";
import BarChartIcon from "@mui/icons-material/BarChart";
import BasicBars from "./componets/barChart";
import EmployeeInformation from "./componets/employeeinformation";
import FixedProject from "./componets/fixedproject";
import InternalProject from "./componets/internalproject";
import Commission from "./componets/commission";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

function SalesReport() {
  const [salesReport, setSalesReport] = useState<any>();
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [selectedStatus, setStatusTab] = useState<string>("Active");
  const [hideChart, setHideChart] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [Issearched, setIsSearch] = useState<boolean>(false);

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
    setSelectedTab("T&M PO");
  }, []);

  useEffect(() => {
    if (selectedTab === "T&M PO") {
      setSalesReport(salesTDMReport);
    } else if (selectedTab === "Employee Information") {
      setSalesReport(getemployeeinformation);
    } else {
      setSalesReport(salesTDMReport);
    }
  }, [selectedTab]);

  useEffect(() => {
    if (selectedStatus === "Active") {
      const activeStatus = salesTDMReport.filter(
        (list: any) => list?.status === "InProgress"
      );

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

  const handleSearch = (query: string) => {
    setSearch(query);
    setIsSearch(true);

    if (!query.trim()) {
      setSalesReport(salesTDMReport); // Return full list if query is empty
      return;
    }

    const SearchedResult = salesTDMReport.filter((sales: any) =>
      Object.values(sales).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(query.toLowerCase())
      )
    );

    setSalesReport(SearchedResult);
  };

  return (
    <div>
      <Sidebar>
        {/* <BreadcrumbsComponent
          selectedTab={selectedTab === "" ? "T&M PO" : selectedTab}
        /> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 p-0">
              {/* <p className="textheader heading my-2">Sales Report</p> */}
            </div>

            <div className="col-6 text-end mb-3">
              <DropdownComponent
                dropdownlist={tabs}
                selectedDatafunction={(data: any) => setSelectedTab(data)}
                color={useColors.themeRed}
              />
            </div>

            {selectedTab.trim() === "" || selectedTab === "T&M PO" ? (
              <div className="row px-0 mb-3">
                <div className="col-8 px-0">
                  <div className="d-flex gap-2 heading2 textheader">
                    <p className="mb-0 dashboardcard p-2 rounded">
                      Total Employee{" "}
                      <span style={{ color: "#8C57FF", fontWeight: 600 }}>
                        {salesTDMReport?.length.toString().padStart(2, "0")}
                      </span>
                    </p>
                    <p className="mb-0 dashboardcard p-2 rounded">
                      Active Employee{" "}
                      <span style={{ color: "#8C57FF", fontWeight: 600 }}>
                        {ActiveEmployees?.length.toString().padStart(2, "0")}
                      </span>
                    </p>
                    <p className="mb-0 dashboardcard p-2 rounded">
                      Inactive Employee{" "}
                      <span style={{ color: "#8C57FF", fontWeight: 600 }}>
                        {InactiveEmployees?.length.toString().padStart(2, "0")}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-4">
                  {selectedTab.trim() === "" || selectedTab === "T&M PO" ? (
                    <div className="d-flex gap-4 align-items-center justify-content-end">
                      <div
                        className="px-2 rounded"
                        style={{ border: `1px solid ${useColors.themeRed}` }}
                      >
                        <select
                          name=""
                          id=""
                          className="para py-2 rounded"
                          style={{
                            color: useColors.themeRed,

                            background: "transparent",
                          }}
                          onChange={(e) => setStatusTab(e.target.value)}
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
                      </div>
                      {selectedStatus === "Inactive" && (
                        <div>
                          <BarChartIcon
                            sx={{
                              color: useColors.themeRed,
                              background: "transparent",
                            }}
                            className="cursor-pointer"
                            onClick={() => setHideChart((p) => !p)}
                          />
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="col-12 px-0 mb-3">
              <div className="d-flex justify-content-between align-items-center gap-3 mb-0 align-items-center">
                <div className="d-flex gap-2 align-items-center">
                  <div className="d-flex gap-2 searchbar ps-2  align-items-center">
                    <div className="mt-1">
                      <SearchIcon />
                    </div>

                    <input
                      type="text"
                      placeholder="Search..."
                      className="p-2 "
                      value={search}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                  <Image src={favourite} alt="" width={24} height={24} />
                </div>
                <div className="d-flex align-items-center gap-3">
                  <LocalPrintshopOutlinedIcon
                    className=" textheader cursorpointer "
                    // onClick={() => handlePrint()}
                  />
                  <SaveAltIcon
                    style={{}}
                    className=" textheader cursorpointer "
                    onClick={() => handleExcelExport(headersQuery, salesReport)}
                  />
                  <SettingsOutlinedIcon className=" textheader cursorpointer " />
                </div>
              </div>
            </div>

            {selectedTab === "T&M PO" || selectedTab === "" ? (
              <>
                <SalesReportTable salesData={salesReport} />
              </>
            ) : (
              ""
            )}

            {selectedTab === "Fixed PO" && (
              <FixedProject salesData={salesReport} />
            )}
            {selectedTab === "Internal PO" && (
              <InternalProject salesData={salesReport} />
            )}
            {selectedTab === "Commission" && (
              <Commission salesData={salesReport} />
            )}
            {selectedTab === "Employee Information" && (
              <EmployeeInformation salesData={salesReport} />
            )}
          </div>
        </div>

        {/* popup Screen */}
        <section
          className={`showpopup ${hideChart ? "showpopupactive" : ""}`}
          onClick={() => setHideChart(false)}
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
                  <BasicBars close={() => setHideChart(false)} />
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
