import { getCompHistory } from "@/app/reusableComponent/JsonData";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import {
    SearchLogic,
} from "@/app/reusableComponent/commonlogic";

import { Colors } from "@/app/reusableComponent/styles";
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import Employees from "./employees";
import Hrdatas from "./hrdatas";
import Reportspoup from "./reportspoup";

type Row = {
    id: number | string;
    request_type: string;
    submitted_date: string;
    approved_by: string;
    status: string;
};

function Prehiredashboard() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState<string>("");
    const [rowsList, setRows] = useState<any>(getCompHistory);
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" | null }>({
        key: "",
        direction: null,
    });


    const arrayList = [
        { id: 1, hractionlist: "Prehire", value: 55, fill: "#FFBA27" },
        { id: 2, hractionlist: "Hiring", value: 26, fill: "#41A4FF" },
        { id: 3, hractionlist: "Onboarding", value: 108, fill: "#00FF47" },
        { id: 4, hractionlist: "Supplier Onboarding", value: 22, fill: "#935AFF" },
    ];

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching delay
        const timer = setTimeout(() => setLoading(false), 2000); // Adjust timeout as necessary
        return () => clearTimeout(timer);
    }, []);

    const useColors = Colors();
    const borderAndBoxShadowStyles = {
        border: useColors.border,
        boxShadow: useColors.boxshadow,
    };


    // Search function
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearch(query);
        const res = SearchLogic(getCompHistory, query);
        setRows(res);
    };

    

    return (
         
        <div className="row">
            {open && <Reportspoup show={open} close={() => setOpen(false)} />}
            {/* Search and Tools Section */}
            <div className="col-12 px-0">
                <div className="d-flex justify-content-between align-items-center gap-3 mb-3 align-items-center">
                    <h4 className="textheader heading2">HR pending action</h4>
                    <div className="d-flex gap-2 align-items-center">
                        <div className="d-flex gap-2 selectborder searchbar ps-2 align-items-center">
                            <div className="mt-1">
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-2 py-1"
                                value={search}
                                onChange={handleSearch}
                            />
                        </div>
                        <UnfoldMoreOutlinedIcon className="cursorpointer"  onClick={() => setOpen((prev) => !prev)} sx={{ color: useColors.themeRed, rotate: "36deg" }} />
                    </div>

                </div>
            </div>
            <div className="col-6">
                <Hrdatas />
            </div>
            {/* Table Section */}
            <div className="col-6  px-0" style={{ overflowX: "auto" }}>
                <table id="printSection" className="table mb-0 tabletype">
                    <thead style={{ backgroundColor: "#F6F7FB" }}>
                        <tr>



                            <th scope="col" className="position-relative textheader para">Employee name</th>
                            <th scope="col" className="position-relative textheader para">Department</th>

                        </tr>
                    </thead>
                    <tbody className="dashboardcard">
                        <tr>
                            <td className="para cursorpointer textheader" onClick={() => setOpen((prev) => !prev)} >Manish yadav</td>
                            <td className="para cursorpointer textheader">Sales</td>
                        </tr>
                        <tr>
                            <td className="para cursorpointer textheader" onClick={() => setOpen((prev) => !prev)} >Manish yadav</td>
                            <td className="para cursorpointer textheader">Sales</td>
                        </tr>
                        <tr>
                            <td className="para cursorpointer textheader" onClick={() => setOpen((prev) => !prev)} >Manish yadav</td>
                            <td className="para cursorpointer textheader">It</td>
                        </tr>
                        <tr>
                            <td className="para cursorpointer textheader" onClick={() => setOpen((prev) => !prev)} >Manish yadav</td>
                            <td className="para cursorpointer textheader">It</td>
                        </tr>
                        <tr>
                            <td className="para cursorpointer textheader" onClick={() => setOpen((prev) => !prev)} >Manish yadav</td>
                            <td className="para cursorpointer textheader">Sales</td>
                        </tr>
                        <tr>
                            <td className="para cursorpointer textheader" onClick={() => setOpen((prev) => !prev)} >Manish yadav</td>
                            <td className="para cursorpointer textheader">Sales</td>
                        </tr>
                        <tr>
                            <td className="para cursorpointer textheader" onClick={() => setOpen((prev) => !prev)} >Manish yadav</td>
                            <td className="para cursorpointer textheader">It</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Prehiredashboard;
