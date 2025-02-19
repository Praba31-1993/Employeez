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
import EmployeeInformation from "./componets/employeeinformation";
import FixedProject from "./componets/fixedproject";
import InternalProject from "./componets/internalproject";
import Commission from "./componets/commission";

function SalesReport() {
  const [salesReport, setSalesReport] = useState<any>();
  const [selectedTab, setSelectedTab] = useState<string>("");

  const useColors = Colors();

  const tabs = [
    { id: 1, label: "T&M PO" },
    { id: 2, label: "Fixed PO" },
    { id: 3, label: "Internal PO" },
    { id: 4, label: "Commission" },
    { id: 5, label: "Employee Information" },
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
      </Sidebar>
    </div>
  );
}

export default SalesReport;
