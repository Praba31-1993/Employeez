"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/page";
import Profile_update from "./component/profile_update";
import "../profile/Profile.css";
import Personal_info from "./component/personal_info";
import Work_status from "./component/work_status";
import General_document from "./component/general_document";
import Work_site from "./component/work_site";
import Emergencycontact_details from "./component/emergencycontact_details";

function Profile() {
  const [role, setRole] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // Prevents SSR issues

  useEffect(() => {
    setIsClient(true); // Mark the component as mounted
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("Role");
      setRole(storedRole || null);
    }
  }, []);

  if (!isClient) return null; // Prevents SSR pre-render issues

  return (
    <div>
      <Sidebar>
        <div className="container-fluid">
          <Profile_update />
        </div>
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-3">
              <Personal_info />
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="row">
                <div className="col-12 px-0">
                  <Work_status />
                </div>
                <div className="col-12 px-0">
                  <General_document />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12 col-md-6 px-lg-0 px-md-2 px-0">
                  <Work_site />
                </div>
                <div className="col-lg-12 col-md-6  px-lg-0 px-md-2 px-0">
                  <Emergencycontact_details />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

export default Profile;
