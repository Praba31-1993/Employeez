"use client";
import React, { useEffect, useState } from "react";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Checkbox } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Colors } from "@/app/reusableComponent/styles";
import {
    handleCSVExport1,
    handleExcelExport,
    handlePrint,
} from "@/app/reusableComponent/commonlogic";
import './stylessheetforreusablecomponent.css'

function PrintExportColumnCustomize({ headers, rowList, hiddenDatas }: any) {
    const [ColumnsList, setColumnsList] = useState<string[]>([]);
    const useColors = Colors();
    const handleColumnToggle = (key: string) => {
        setColumnsList((prev) =>
            prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
        );
    };

    useEffect(() => {
        hiddenDatas(ColumnsList);
    }, [ColumnsList]);

    return (
        <div>
            <div className="d-flex tools align-items-center gap-3">
                <LocalPrintshopOutlinedIcon
                    className="textheader cursorpointer"
                    onClick={() => handlePrint()}
                />
                <div className="dropdown">
                    <a
                        className="dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <SaveAltIcon className="textheader cursorpointer" />
                    </a>
                    <ul
                        className="dropdown-menu dashboardcard"
                        aria-labelledby="dropdownMenuLink"
                    >
                        <li onClick={() => handleExcelExport(headers, rowList)}>
                            <a className="dropdown-item textheader" href="#">
                                Excel
                            </a>
                        </li>
                        <li onClick={() => handleCSVExport1(headers, rowList)}>
                            <a className="dropdown-item textheader" href="#">
                                Csv
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="dropdown">
                    <a
                        className="dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <SettingsOutlinedIcon className="textheader cursorpointer" />
                    </a>
                    <ul
                        className="dropdown-menu dashboardcard custom-scrollbar"
                        aria-labelledby="dropdownMenuLink"
                        style={{ height: "400px", overflowY: "auto" }}
                    >
                        {Object.keys(headers).map((header) => {
                            const key: any = headers[header as keyof typeof headers];

                            return (
                                <li key={key}>
                                    <label className="dropdown-item textheader">
                                        <Checkbox
                                            checked={!ColumnsList.includes(key)}
                                            onChange={() => handleColumnToggle(key)}
                                            sx={{
                                                cursor: "pointer",
                                                "&.Mui-checked": { color: useColors.themeRed },
                                            }}
                                        />
                                        {header}
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PrintExportColumnCustomize;
