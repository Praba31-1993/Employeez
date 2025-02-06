"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/page";
import BreadcrumbsComponent from "../reusableComponent/breadcrumbs";
import DropdownComponent from "../reusableComponent/dropdown";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Colors } from "@/app/reusableComponent/styles";
import EmployeeDocumentTable from "./components/employeedocumenttable";
import ProjectHistory from "../projectstatus/components/projecthistory";

function EmployeeDocument() {
  const [selectedTab, setSelectedTab] = useState<string>("Employee Document");
  const role: string = useSelector((state: RootState) => state.role.role);
  const useColors = Colors();

  const tabs = [
    { id: 1, label: "Employee Document" },
    { id: 2, label: "Project History" },
  ];

  return (
    <div>
      <Sidebar>
        <BreadcrumbsComponent
          selectedTab={selectedTab === "" ? "" : selectedTab}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 p-0">
              <p className="textheader heading my-2">Employee Document</p>
            </div>
          </div>
        </div>

        {/* Corrected conditional rendering */}
        {selectedTab === "Employee Document" || selectedTab === "" ? (
          <EmployeeDocumentTable />
        ) : (
          <>
            <ProjectHistory />
          </>
        )}
      </Sidebar>
    </div>
  );
}

export default EmployeeDocument;
