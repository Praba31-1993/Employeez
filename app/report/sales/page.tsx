"use client";
import BreadcrumbsComponent from "@/app/reusableComponent/breadcrumbs";
import DropdownComponent from "@/app/reusableComponent/dropdown";
import Sidebar from "@/app/sidebar/page";
import React, { useState } from "react";
import { Colors } from "@/app/reusableComponent/styles";
import SalesReportTable from "./componets/salesReportTable";
import { salesTDMReport } from "@/app/reusableComponent/JsonData";

function SalesReport() {
  const [selectedTab, setSelectedTab] = useState<string>("T&M PO");
  const useColors = Colors();

  const tabs = [
    { id: 1, label: "T&M PO" },
    { id: 2, label: "Fixed PO" },
    { id: 3, label: "Internal PO" },
    { id: 4, label: "Commission" },
    { id: 5, label: "Employee Information" },
  ];

  console.log('salesData+++',salesTDMReport );
  
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

            {selectedTab === "T&M PO" || selectedTab === "" ? (
              <>
                <SalesReportTable salesData={salesTDMReport} />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

export default SalesReport;
