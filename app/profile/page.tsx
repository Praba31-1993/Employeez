"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "../profile/Profile.css";

// ❌ Sidebar & other components might be using `document`, so disable SSR
const Sidebar = dynamic(() => import("../sidebar/page"), { ssr: false });
const Profile_update = dynamic(() => import("./component/profile_update"), { ssr: false });
const Personal_info = dynamic(() => import("./component/personal_info"), { ssr: false });
const Work_status = dynamic(() => import("./component/work_status"), { ssr: false });
const General_document = dynamic(() => import("./component/general_document"), { ssr: false });
const Work_site = dynamic(() => import("./component/work_site"), { ssr: false });
const Emergencycontact_details = dynamic(() => import("./component/emergencycontact_details"), { ssr: false });

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
