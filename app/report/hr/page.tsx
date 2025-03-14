"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { hrrepots } from "../../reusableComponent/JsonData";
import { Colors } from "@/app/reusableComponent/styles";

// ❌ Sidebar and DropdownComponent might be using `document`, so disable SSR
const Sidebar = dynamic(() => import("@/app/sidebar/page"), { ssr: false });
const DropdownComponent = dynamic(() => import("@/app/reusableComponent/dropdown"), { ssr: false });
const Comp_history = dynamic(() => import("./components/comp_history"), { ssr: false });

function Hr_report() {
  // ✅ Prevent `document is not defined` errors by checking for `window`
  const useColors = typeof window !== "undefined" ? Colors() : { themeRed: "#ff0000" };
  
  const [selectedTimeOff, setSelectedTimeOff] = useState("");
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("Role");
      setRole(storedRole || null);
    }
  }, []);

  return (
    <div>
      <Sidebar>
        <div className="row mt-1">
          <div className="col-4">
            <p className="textheader heading my-2">HR report</p>
          </div>
          <div className="col-8 text-end">
            <DropdownComponent
              dropdownlist={hrrepots}
              color={useColors.themeRed}
              selectedDatafunction={(data: any) => setSelectedTimeOff(data)}
            />
          </div>
        </div>
        <div className="container-fluid">
          <Comp_history />
        </div>
      </Sidebar>
    </div>
  );
}

export default Hr_report;
