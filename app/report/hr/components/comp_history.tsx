import { getCompHistory } from "@/app/reusableComponent/JsonData";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";
import {
    SearchLogic,
} from "@/app/reusableComponent/commonlogic";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Comp_history_popup from "./comp_history_popup";
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import { Colors } from "@/app/reusableComponent/styles";
import PrintExportColumnCustomize from "@/app/reusableComponent/printexportcolumncustomize";

type Row = {
    id: number | string;
    request_type: string;
    submitted_date: string;
    approved_by: string;
    status: string;
};

function Comphistory() {
    const [search, setSearch] = useState<string>("");
    const [rowsList, setRows] = useState<any>(getCompHistory);
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" | null }>({
        key: "",
        direction: null,
    });

    const headers: Record<string, keyof (typeof getCompHistory)[0]> = {
        "Employee Name": "emp_Name",
        "Employee ID": "emp_Id",
        Component: "component",
        "From Date": "fromDate",
        "End Date": "endDate",
        Amount: "amount",
    };

    // Sorting function
    const handleSort = <K extends keyof Row>(key: K) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }

        const sortedData = [...rowsList].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setRows(sortedData);
    };

    // Search function
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearch(query);
        const res = SearchLogic(getCompHistory, query);
        setRows(res);
    };

    // Toggle column visibility
    const [open, setOpen] = useState(false);
    const useColors = Colors();

    return (
        <div className="row">
            {open && <Comp_history_popup show={open} close={() => setOpen(false)} />}

            {/* Search and Tools Section */}
            <div className="col-12 px-0">
                <div className="d-flex justify-content-between align-items-center gap-3 mb-3 align-items-center">
                    <div className="d-flex gap-2 align-items-center">
                        <div className="d-flex gap-2 searchbar ps-2 align-items-center">
                            <div className="mt-1">
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="p-2"
                                value={search}
                                onChange={handleSearch}
                            />
                        </div>
                        <div className="rounded-circle cursorpointer" style={{ border: `1px solid ${useColors.themeRed}` }} >
                            <BookmarkAddOutlinedIcon className="m-1" sx={{ color: useColors.themeRed }} />
                        </div>
                    </div>
                    <PrintExportColumnCustomize
                        headers={headers}
                        rowList={rowsList}
                        hiddenDatas={(data: any) => setHiddenColumns(data)}
                    />
                </div>
            </div>

            {/* Table Section */}
            <div className="col-12 stickyheader px-0" style={{ overflowX: "auto" }}>
                <table id="printSection" className="table mb-0 tabletype">
                    <thead style={{ backgroundColor: "#F6F7FB" }}>
                        <tr>
                            {Object.keys(headers).map((header) => {
                                const key = headers[header as keyof typeof headers];

                                if (hiddenColumns.includes(key)) return null; // Hide column

                                return (
                                    <th key={key} scope="col" className="position-relative textheader para">
                                        {header}
                                        <NorthOutlinedIcon
                                            className={`textheader cursorpointer ms-1 mb-1 ${sortConfig.key === key && sortConfig.direction === "asc" ? "rotatearrow" : ""
                                                }`}
                                            sx={{ fontSize: "20px" }}
                                            onClick={() => handleSort(key as keyof Row)}
                                        />
                                    </th>
                                );
                            })}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="dashboardcard">
                        {rowsList?.map((item: any, index: number) => (
                            <tr key={index}>
                                {!hiddenColumns.includes("emp_Name") && <td className="para textheader">{item?.emp_Name}</td>}
                                {!hiddenColumns.includes("emp_Id") && <td className="para textheader">{item?.emp_Id}</td>}
                                {!hiddenColumns.includes("component") && <td className="para textheader">{item?.component}</td>}
                                {!hiddenColumns.includes("fromDate") && <td className="para textheader">{item?.fromDate}</td>}
                                {!hiddenColumns.includes("endDate") && <td className="para textheader">{item?.endDate}</td>}
                                {!hiddenColumns.includes("amount") && <td className="para textheader">$ {item?.amount}</td>}
                                <td className="para textheader">
                                    <RemoveRedEyeOutlinedIcon onClick={() => setOpen((prev) => !prev)} className="cursorpointer" sx={{ color: useColors.themeRed }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Comphistory;
