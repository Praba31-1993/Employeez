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
import ViewEmployeeDocument from "./components/viewemployeedocument";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

function EmployeeDocument() {
  const [selectedTab, setSelectedTab] = useState<string>("Employee Document");
  const [employeeId, setEmployeeId] = useState<any>("");
  const useColors = Colors();

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("Role");
      setRole(storedRole || null);
    }
  }, []);
  const tabs = [
    { id: 1, label: "Employee Document" },
    { id: 2, label: "Employee document submission" },
  ];

  return (
    <div>
      <Sidebar>
        {/* <BreadcrumbsComponent
          selectedTab={selectedTab === "" ? "" : "Employee document submission"}
        /> */}

        <div className="container-fluid">
          {employeeId !== "" && (
            <button
              onClick={() => setEmployeeId("")}
              className="para textheader"
            >
              <ArrowBackOutlinedIcon className="mr-1" />
              Back
            </button>
          )}
          <div className="row">
            <div className="col-6 p-0">
              <p className="textheader heading my-2">
                {employeeId === ""
                  ? "Employee Document"
                  : "Employee document submission"}
              </p>
            </div>
          </div>
        </div>

        {employeeId === "" ? (
          <EmployeeDocumentTable
            getEmployeeDetails={(data: any) => setEmployeeId(data)}
          />
        ) : (
          <ViewEmployeeDocument employeeId={employeeId} />
        )}
      </Sidebar>
    </div>
  );
}

export default EmployeeDocument;
