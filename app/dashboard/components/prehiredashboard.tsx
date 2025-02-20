import { getCompHistory } from "@/app/reusableComponent/JsonData";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import {
    SearchLogic,
} from "@/app/reusableComponent/commonlogic";

import { Colors } from "@/app/reusableComponent/styles";
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';

type Row = {
    id: number | string;
    request_type: string;
    submitted_date: string;
    approved_by: string;
    status: string;
};

function Prehiredashboard() {
    const [search, setSearch] = useState<string>("");
    const [rowsList, setRows] = useState<any>(getCompHistory);
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" | null }>({
        key: "",
        direction: null,
    });

 



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

            {/* Search and Tools Section */}
            <div className="col-12 px-0">
                <div className="d-flex justify-content-between align-items-center gap-3 mb-3 align-items-center">
                    <h4 className="textheader heading2">Prehire</h4>
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
                        <UnfoldMoreOutlinedIcon sx={{color:useColors.themeRed,rotate:"36deg"}} />
                    </div>
                    
                </div>
            </div>

            {/* Table Section */}
            <div className="col-12  px-0" style={{ overflowX: "auto" }}>
                <table id="printSection" className="table mb-0 tabletype">
                    <thead style={{ backgroundColor: "#F6F7FB" }}>
                        <tr>
                           

                             
                                    <th scope="col" className="position-relative textheader para">Employee name</th>
                                    <th scope="col" className="position-relative textheader para">Department</th>
                            
                        </tr>
                    </thead>
                    <tbody className="dashboardcard">
                            <tr>
                                 <td className="para textheader">Manish yadav</td>
                                <td className="para textheader">Sales</td>
                            </tr>
                            <tr>
                                 <td className="para textheader">Manish yadav</td>
                                <td className="para textheader">Sales</td>
                            </tr>
                            <tr>
                                 <td className="para textheader">Manish yadav</td>
                                <td className="para textheader">It</td>
                            </tr>
                            <tr>
                                 <td className="para textheader">Manish yadav</td>
                                <td className="para textheader">It</td>
                            </tr>
                            <tr>
                                 <td className="para textheader">Manish yadav</td>
                                <td className="para textheader">Sales</td>
                            </tr>
                            <tr>
                                 <td className="para textheader">Manish yadav</td>
                                <td className="para textheader">Sales</td>
                            </tr>
                            <tr>
                                 <td className="para textheader">Manish yadav</td>
                                <td className="para textheader">It</td>
                            </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Prehiredashboard;
