import React from "react";
import { Colors } from "../../reusableComponent/styles";
import ProfilesCard from "../components/profilescard";
import ListCard from "@/app/reusableComponent/listitems";

function ManagerDashboard() {
  const useColors = Colors();
  const borderAndBoxShadowStyles = {
    border: useColors.border,
    boxShadow: useColors.boxshadow,
  };
  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-12 col-md-8">
          <div
            className="dashboardcard h-100  p-3"
            style={borderAndBoxShadowStyles}
          >
            <ProfilesCard />
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="dashboardcard p-3 h-100">
            <ListCard />
          </div>
        </div>
        <div className="col-12 col-md-4"></div>
        <div className="col-12 col-md-4"></div>
        <div className="col-12 col-md-4"></div>
        <div className="col-12 col-md-4"></div>
        <div className="col-12 col-md-4"></div>
        <div className="col-12 col-md-4"></div>
        <div className="col-12 col-md-9"></div>
        <div className="col-12 col-md-4"></div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
