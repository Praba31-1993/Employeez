import DropdownComponent from "@/app/reusableComponent/dropdown";
import {
  year,
  rowsForApprover,
  columnForApprover,
} from "@/app/reusableComponent/JsonData";
import React, { useState, useRef, useEffect } from "react";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import FilterListIcon from "@mui/icons-material/FilterList";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import HistoryIcon from "@mui/icons-material/History";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import { Checkbox } from "@mui/material";
import NorthSharpIcon from "@mui/icons-material/NorthSharp";
import ChipsForLeave from "@/app/reusableComponent/chipsforleave";
import Image from "next/image";
import favourite from "@/public/assets/img/favourite.svg";
import Paginationcomponent from "@/app/reusableComponent/paginationcomponent";
import ColumnSorting from "@/app/reusableComponent/columnsorting";
import Filtersorting from "@/app/reusableComponent/filtersorting";
import ExportDocuments from "@/app/reusableComponent/exportdocuments";

interface ApproverRow {
  employeeId: string;
  employeename: string;
  date: string;
  status: string;
  punchin: string;
  punchout: string;
  duration: string;
  reason: string;
}
function Punchinoutapprover() {
  const [search, setSearch] = useState<string>("");
  const ExportRef = useRef<HTMLDivElement>(null);
  const [selectedTimeOff, setSelectedTimeOff] = useState("Punch in/Out report");
  const [openColumn, setOpenColumn] = useState<Boolean>(false);
  const [openExport, setOpenExport] = useState<Boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchList, setSearchList] = useState<any>(columnForApprover);
  const [rowsList, setRows] = useState<ApproverRow[]>(rowsForApprover);
  const columnRef = useRef<HTMLDivElement>(null);
  const [showdetails, setDetails] = useState(false);
  const [pages, setPages] = useState([]);
  const [countPerPage, setCountForPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = rowsList.length;
  const totalPages = Math.ceil(totalCount / countPerPage);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof ApproverRow;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    const arr: any = [];
    for (let i = 1; i <= totalPages; i++) {
      arr.push(i);
    }
    setPages(arr);
  }, [totalPages]);

  const handleSort = (key: keyof ApproverRow) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedRows = [...rowsForApprover].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setRows(sortedRows);
  };

  const currentPageItems = rowsList.slice(
    (currentPage - 1) * countPerPage,
    currentPage * countPerPage
  );

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };


  return (
    <div>
      {/* column, filter */}
      <div className="d-flex  justify-content-between mt-3 mb-2">
        <div className="d-flex flex-wrap  gap-2 heading2 textheader cursorPointer p-0 mb-0">
          <ColumnSorting columnList={searchList} />
          <Filtersorting  />
          <ExportDocuments exportDatas={rowsList} />
          <div className="d-flex align-items-center">
            <HistoryIcon />
            <DropdownComponent
              dropdownlist={year}
              removepadding={true}
              selectedDatafunction={(data: any) => setSelectedTimeOff(data)}
            />
          </div>
          <div className="d-flex align-items-center">
            <CalendarMonthIcon />
            <DropdownComponent
              dropdownlist={year}
              removepadding={true}
              selectedDatafunction={(data: any) => setSelectedTimeOff(data)}
            />
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="d-flex gap-3">
            <Image src={favourite} alt="" width={24} height={24} />
            <div className="d-flex gap-1 w-100 searchbar ps-2 align-items-center">
              <div className="mt-1">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="p-2 w-100"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="">
        <table className="table tabletype">
          <thead style={{ backgroundColor: "#F6F7FB" }}>
            <tr>
              <th className="textheader para" scope="col">
                Employee Id{" "}
                <NorthSharpIcon
                  fontSize="small"
                  className="inline-block"
                  sx={{
                    fill: "#CCC",
                    height: "15px",
                    width: "15px",
                    transform:
                      sortConfig?.direction === "asc"
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                  }}
                  onClick={() => handleSort("employeeId")}
                />
              </th>
              <th className="textheader para" scope="col">
                Employee name
                <NorthSharpIcon
                  fontSize="small"
                  className="inline-block"
                  sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                  onClick={() => handleSort("employeename")}
                />
              </th>
              <th className="textheader para" scope="col">
                Date
                <NorthSharpIcon
                  fontSize="small"
                  className="inline-block"
                  sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                  onClick={() => handleSort("date")}
                />
              </th>
              <th className="textheader para" scope="col">
                Status
                <NorthSharpIcon
                  fontSize="small"
                  className="inline-block"
                  sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                  onClick={() => handleSort("status")}
                />
              </th>
              <th className="textheader para" scope="col">
                Punch in
                <NorthSharpIcon
                  fontSize="small"
                  className="inline-block"
                  sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                  onClick={() => handleSort("punchin")}
                />
              </th>
              <th className="textheader para" scope="col">
                Punch out
                <NorthSharpIcon
                  fontSize="small"
                  className="inline-block"
                  sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                  onClick={() => handleSort("punchout")}
                />
              </th>
              <th className="textheader para" scope="col">
                Duration
                <NorthSharpIcon
                  fontSize="small"
                  className="inline-block"
                  sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                  onClick={() => handleSort("duration")}
                />
              </th>

              <th className="textheader para" scope="col">
                Reasons
                <NorthSharpIcon
                  fontSize="small"
                  className="inline-block"
                  sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                  onClick={() => handleSort("reason")}
                />
              </th>
            </tr>
          </thead>
          <tbody className="dashboardcard">
            {currentPageItems?.map((item, index) => (
              <tr key={index}>
                <td className="para textheader">{item?.employeeId}</td>
                <td className="para textheader">{item?.employeename}</td>
                <td className="para textheader">{item?.date}</td>
                <td className="para textheader">
                  <ChipsForLeave label={item?.status} />
                </td>
                <td className="para textheader">{item?.punchin}</td>
                <td className="para textheader">{item?.punchout}</td>
                <td className="para textheader">{item?.duration}</td>
                <td className="para textheader">{item?.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* table ends */}
      <Paginationcomponent
        currentPage={currentPage}
        currentPageFunction={handlePageChange}
        pages={pages}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Punchinoutapprover;
