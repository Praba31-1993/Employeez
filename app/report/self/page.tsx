"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import DropdownComponent from "@/app/reusableComponent/dropdown";
import { selfrepots } from "../../reusableComponent/JsonData";
import { Colors } from "@/app/reusableComponent/styles";
import Sidebar from "@/app/sidebar/page";

// ⏬ Dynamic Imports (SSR Disabled)
const Vacationreport = dynamic(
  () => import("./components/report_vacationreports/reportvacationreport"),
  { ssr: false }
);
const Changerequest = dynamic(
  () => import("./components/changerequest/changerequest"),
  { ssr: false }
);
const Downloadreport = dynamic(
  () => import("./components/downloadreport"),
  { ssr: false }
);
const Punchinoutreport = dynamic(
  () => import("./components/punchinoutreport"),
  { ssr: false }
);
const Disciplinaryreport = dynamic(
  () => import("./components/disciplinaryreport"),
  { ssr: false }
);

function Self() {
  const useColors = Colors();
  const [selectedTimeOff, setSelectedTimeOff] = useState("");
  const [role, setRole] = useState<string | null>(null); // Role state
  const [isClient, setIsClient] = useState(false); // Track client rendering

  // ✅ Ensure `localStorage` is accessed only on the client
  useEffect(() => {
    setIsClient(true); // Set flag to indicate the client-side rendering
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("Role"));
    }
  }, []);

  // ✅ Prevent rendering until `localStorage` is accessible
  if (!isClient) {
    return null; // Or you can return a loader
  }

  return (
    <Sidebar>
      <div className="row">
        <div className="col-6">
          <p className="textheader heading my-2">Self report</p>
        </div>
        <div className="col-6 text-end">
          <DropdownComponent
            dropdownlist={selfrepots}
            color={useColors.themeRed}
            selectedDatafunction={(data: any) => setSelectedTimeOff(data)}
          />
        </div>
      </div>
      <div>
        {/* ✅ Dynamically Loaded Components */}
        {(selectedTimeOff === "" || selectedTimeOff === "Vacation report") && (
          <Vacationreport />
        )}
        {selectedTimeOff === "Change report" && <Changerequest />}
        {selectedTimeOff === "Download report" && <Downloadreport />}
        {selectedTimeOff === "Punch in/Out report" && <Punchinoutreport />}
        {selectedTimeOff === "Disciplinary report" && <Disciplinaryreport />}
      </div>
    </Sidebar>
  );
}

export default Self;
