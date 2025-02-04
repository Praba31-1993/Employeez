"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/page";
import BreadcrumbsComponent from "../reusableComponent/breadcrumbs";
import DropdownComponent from "../reusableComponent/dropdown";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Colors } from "@/app/reusableComponent/styles";
import CreateProject from "./components/createProject";
import ProjectHistory from "./components/projecthistory";

function ProjectStatus() {
  const [selectedTab, setSelectedTab] = useState<string>("");
  const role: string = useSelector((state: RootState) => state.role.role);
  const useColors = Colors();

  const tabs = [
    { id: 1, label: "New Project" },
    { id: 2, label: "Project History" },
  ];

  return (
    <div>
      <Sidebar>
        <div className="container-fluid">
          <div className="row">
            <BreadcrumbsComponent selectedTab={selectedTab} />

            <div className="col-6">
              <p className="textheader heading my-2">Project Status</p>
            </div>

            <div className="col-6 text-end mb-3">
              <DropdownComponent
                dropdownlist={tabs}
                selectedDatafunction={(data: any) => setSelectedTab(data)}
                color={useColors.themeRed}
              />
            </div>
          </div>
        </div>

        {/* Corrected conditional rendering */}
        {selectedTab === "New Project" || selectedTab === "" ? (
          <CreateProject />
        ) : (
          <>
            <ProjectHistory />
          </>
        )}
      </Sidebar>
    </div>
  );
}

export default ProjectStatus;
