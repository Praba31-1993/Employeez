"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Colors } from "@/app/reusableComponent/styles";
import Basicinfo from "./basicinfo";
import Workauthrizeddashboardreports from "./workauthorized";
import Insurancedashboardreports from "./insurancebenefits";
import Worksitedreports from "./worksitereports";
import Emergencycontactdashboardreport from "./emergencycontactdashboard";

export default function Employreportdetails({ show, close }: any) {
    const useColors = Colors();

    // Define the type for selectedReports keys
    type ReportKey = "basicInfo" | "workSite" | "emergencyContact" | "workAuthorization" | "insuranceBenefits";

    // Defaultly select all reports
    const [selectedReports, setSelectedReports] = useState<Record<ReportKey, boolean>>({
        basicInfo: true,
        workSite: true,
        emergencyContact: true,
        workAuthorization: true,
        insuranceBenefits: true,
    });

    // Handle checkbox toggle
    const handleCheckboxChange = (key: ReportKey) => {
        setSelectedReports((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <section className={`showpopup ${show ? "showpopupactive" : ""}`} onClick={close}>
            <div
                className="summarysection rounded m-auto"
                style={{ width: "90%", height: "95%", background: "#F5F5F5" }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="container-fluid">
                    <div className="d-flex px-2 my-2 align-items-center justify-content-between">
                        <div>
                            <p className="heading mb-0 textheader">Manish Yadhav (MY1234)</p>
                        </div>
                        <div className="d-flex gap-4 align-items-center justify-content-end cursorpointer">
                            <div className="tools">
                                <div className="dropdown">
                                    <a
                                        className="dropdown-toggle"
                                        role="button"
                                        id="dropdownMenuLink"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <SettingsOutlinedIcon className="textheader cursorpointer" />
                                    </a>
                                    <ul className="dropdown-menu dashboardcard custom-scrollbar" aria-labelledby="dropdownMenuLink">
                                        {(
                                            [
                                                { key: "basicInfo", label: "Basic Info" },
                                                { key: "workSite", label: "Work Site" },
                                                { key: "emergencyContact", label: "Emergency Contact" },
                                                { key: "workAuthorization", label: "Work Authorization" },
                                                { key: "insuranceBenefits", label: "Insurance Benefits" }
                                            ] as { key: ReportKey; label: string }[]
                                        ).map(({ key, label }) => (
                                            <li className="dropdown-item textheader" key={key}>
                                                <label>
                                                    <Checkbox
                                                        checked={selectedReports[key]}
                                                        onChange={() => handleCheckboxChange(key)}
                                                        sx={{
                                                            cursor: "pointer",
                                                            "&.Mui-checked": { color: useColors.themeRed },
                                                        }}
                                                    />{" "}
                                                    {label}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <FontAwesomeIcon className="textheader" style={{ cursor: "pointer" }} icon={faXmark} onClick={close} />
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-lg-6">
                            {selectedReports.basicInfo && <Basicinfo />}
                            {selectedReports.emergencyContact && <Emergencycontactdashboardreport />}
                        </div>
                        <div className="col-lg-6">
                            {selectedReports.workAuthorization && <Workauthrizeddashboardreports />}
                            {selectedReports.workSite && <Worksitedreports />}
                            {selectedReports.insuranceBenefits && <Insurancedashboardreports />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
