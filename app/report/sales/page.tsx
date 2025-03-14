"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import Sidebar from "@/app/sidebar/page";
import DropdownComponent from "@/app/reusableComponent/dropdown";
import { Colors } from "@/app/reusableComponent/styles";
import { salesTDMReport, getemployeeinformation } from "@/app/reusableComponent/JsonData";

// ✅ Dynamic imports (SSR Disabled)
const SalesReportTable = dynamic(() => import("./componets/salesReportTable"), { ssr: false });
const EmployeeInformation = dynamic(() => import("./componets/employeeinformation"), { ssr: false });
const FixedProject = dynamic(() => import("./componets/fixedproject"), { ssr: false });
const InternalProject = dynamic(() => import("./componets/internalproject"), { ssr: false });
const Commission = dynamic(() => import("./componets/commission"), { ssr: false });

function SalesReport() {
  const useColors = Colors();
  const [salesReport, setSalesReport] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState<string>("T&M PO"); // Default Tab
  const [isMounted, setIsMounted] = useState(false); // ✅ Ensure Client-Side Rendering

  const tabs = [
    { id: 1, label: "T&M PO" },
    { id: 2, label: "Fixed PO" },
    { id: 3, label: "Internal PO" },
    { id: 4, label: "Commission" },
    { id: 5, label: "Employee Information" },
  ];

  // ✅ Ensure this runs only on the client
  useEffect(() => {
    setIsMounted(true);
    const storedTab = typeof window !== "undefined" ? localStorage.getItem("selectedTab") : null;
    if (storedTab) setSelectedTab(storedTab);
  }, []);

  useEffect(() => {
    if (!isMounted) return; // ✅ Prevent SSR issues

    localStorage.setItem("selectedTab", selectedTab);

    switch (selectedTab) {
      case "Employee Information":
        setSalesReport(getemployeeinformation);
        break;
      default:
        setSalesReport(salesTDMReport);
    }
  }, [selectedTab, isMounted]);

  return (
    <div>
      <Sidebar>
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
          </div>

          {/* ✅ Render only after component is mounted */}
          {isMounted && (
            <>
              {selectedTab === "T&M PO" && <SalesReportTable salesData={salesReport} />}
              {selectedTab === "Fixed PO" && <FixedProject salesData={salesReport} />}
              {selectedTab === "Internal PO" && <InternalProject salesData={salesReport} />}
              {selectedTab === "Commission" && <Commission salesData={salesReport} />}
              {selectedTab === "Employee Information" && <EmployeeInformation salesData={salesReport} />}
            </>
          )}
        </div>
      </Sidebar>
    </div>
  );
}

export default SalesReport;
