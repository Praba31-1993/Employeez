import { getCompHistory } from "@/app/reusableComponent/JsonData";
import React, { useState } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";
import {
  handleExcelExport,
  handlePrint,
  SearchLogic,
} from "@/app/reusableComponent/commonlogic";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Comp_history_popup from "./comp_history_popup";
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import { Colors } from "@/app/reusableComponent/styles";
 
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
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
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
    console.log("key,", key);
 
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
 
  console.log("rowList", rowsList);
 
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);
    const res = SearchLogic(getCompHistory, query);
    setRows(res);
  };
  const [open, setOpen] = useState(false);
   const useColors = Colors();
  return (
    <div className="row">
      {open && <Comp_history_popup show={open} close={() => setOpen(false)} />}
      {/* column, filter */}
 
      <div className="col-12 px-0">
        <div className="d-flex justify-content-between align-items-center gap-3 mb-3  align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <div className="d-flex gap-2 searchbar ps-2  align-items-center">
              <div className="mt-1">
                <SearchIcon />
              </div>
 
              <input
                type="text"
                placeholder="Search..."
                className="p-2 "
                value={search}
                onChange={handleSearch}
              />
            </div>
            <div className="rounded-circle cursorpointer" style={{border:`1px solid ${useColors.themeRed}`}} >
                <BookmarkAddOutlinedIcon className="m-1" sx={{color:useColors.themeRed}} />
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <LocalPrintshopOutlinedIcon
              className=" textheader cursorpointer "
              onClick={() => handlePrint()}
            />
            <SaveAltIcon
              style={{}}
              className=" textheader cursorpointer "
              onClick={() => handleExcelExport(headers, getCompHistory)}
            />
            <SettingsOutlinedIcon className=" textheader cursorpointer " />
          </div>
        </div>
      </div>
 
      {/* Table Section */}
      <div className="col-12 stickyheader px-0" style={{ overflowX: "auto" }}>
        <table id="printSection" className="table mb-0 tabletype">
          <thead style={{ backgroundColor: "#F6F7FB" }}>
            <tr>
              {Object.keys(headers).map((header) => {
                const key = headers[header as keyof typeof headers]; // Get the actual column key
 
                return (
                  <th
                    key={key}
                    scope="col"
                    className="position-relative textheader para"
                  >
                    {header} {/* Display formatted column name */}
                    <NorthOutlinedIcon
                      className={`textheader cursorpointer ms-1 mb-1 ${
                        sortConfig.key === key && sortConfig.direction === "asc"
                          ? "rotatearrow"
                          : ""
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
            {rowsList?.map((item: any, index: any) => (
              <tr key={index}>
                <td className="para textheader">{item?.emp_Name}</td>
                <td className="para textheader">{item?.emp_Id}</td>
                <td className="para textheader"> {item?.component} </td>
                <td
                  className="para textheader"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {item?.fromDate}
                </td>
                <td
                  className="para textheader"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {item?.endDate}
                </td>
 
                <td className="para textheader">$ {item?.amount}</td>
                <td className="para textheader">
                  <RemoveRedEyeOutlinedIcon
                    onClick={() => setOpen((prev) => !prev)}
                    className="cursorpointer"
                    titleAccess="View History"
                    sx={{color:useColors.themeRed }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* table ends */}
    </div>
  );
}
 
export default Comphistory;