import DropdownComponent from "@/app/reusableComponent/dropdown";
import {
  year,
  rowsForApprover,
  columnForApprover,
} from "@/app/reusableComponent/JsonData";
import React, { useState, useRef } from "react";
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
  const [tableColumns, setTableColumns] = useState<any>(columnForApprover);
  const [rowsList, setRows] = useState<ApproverRow[]>(rowsForApprover);
  const columnRef = useRef<HTMLDivElement>(null);
  const [showdetails, setDetails] = useState(false);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof ApproverRow;
    direction: "asc" | "desc";
  } | null>(null);

  const handleChecked = (id: any) => {
    const updatedColumns = tableColumns.map((columnsList: any) => {
      if (columnsList.id === id) {
        return {
          ...columnsList,
          checked: !columnsList.checked,
        };
      }
      return columnsList;
    });
    setTableColumns(updatedColumns);
    setSearchList(updatedColumns);
  };

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

  return (
    <div>
      <div className="d-flex  justify-content-between mt-3 mb-2">
        <ul className="d-flex flex-wrap align-items-end gap-2 heading2 textheader cursorPointer p-0 mb-0">
          <li
            className="d-flex align-items-center"
            onClick={() => setOpenColumn((p) => !p)}
          >
            <CalendarViewWeekIcon />
            <div className="show mx-2">
              <div>Column</div>
            </div>
          </li>

          <li className="d-flex align-items-center">
            <FilterListIcon />
            <span className="mx-2">Filters</span>
          </li>
          <li>
            <div
              className="d-flex align-items-center"
              onClick={() => setOpenExport((p) => !p)}
            >
              <SaveAltIcon />
              <div className="dropdown mx-2">
                <div role="div" id="dropdownMenuLink" data-bs-toggle="dropdown">
                  Export
                </div>
              </div>
            </div>

            {openExport && (
              <div
                className="p-2"
                onClick={() => setOpenExport(true)}
                style={{
                  background: "white",
                  width: "fit-content",
                  position: "absolute",
                }}
                ref={ExportRef}
              >
                <p
                  className="m-0 para textheader"
                  // onClick={() => handleCSVExport(headers, rows)}
                >
                  CSV File
                </p>
              </div>
            )}
          </li>
          <li className="d-flex align-items-center">
            <HistoryIcon />
            <div className="ms-2">
              <DropdownComponent
                dropdownlist={year}
                removepadding={true}
                selectedDatafunction={(data: any) => setSelectedTimeOff(data)}
              />
            </div>
          </li>
          <li className="d-flex align-items-center">
            <CalendarMonthIcon />
            <div className="ms-2">
              <DropdownComponent
                dropdownlist={year}
                removepadding={true}
                selectedDatafunction={(data: any) => setSelectedTimeOff(data)}
              />
            </div>
          </li>
        </ul>
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
      {/* column Function */}
      <div
        className=""
        style={{ position: "relative" }}
        onClick={() => setOpenColumn(true)}
        ref={columnRef}
      >
        {openColumn && (
          <div
            className=" cursorPointer px-1 "
            aria-labelledby="dropdownMenuLink"
            style={{
              width: "max-content",
              background: "white",
              position: "absolute",
              boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <div
              className="d-flex gap-1  p-2 align-items-center"
              style={{ border: "1px solid blue" }}
            >
              <div className="mt-1">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="p-2 w-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {searchList?.map((columnList: any) => (
              <div className="checkboxwithList" key={columnList?.id}>
                <Checkbox
                  checked={columnList?.checked}
                  onChange={() => handleChecked(columnList?.id)}
                />
                <span>{columnList?.key}</span>
              </div>
            ))}
          </div>
        )}
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
            {rowsList?.map((item, index) => (
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
    </div>
  );
}

export default Punchinoutapprover;
