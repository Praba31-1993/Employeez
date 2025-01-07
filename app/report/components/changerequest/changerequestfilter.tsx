"use client";
import React, { useEffect, useState, useRef } from "react";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import FilterListIcon from "@mui/icons-material/FilterList";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import HistoryIcon from "@mui/icons-material/History";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DropdownComponent from "../../../reusableComponent/dropdown";
import { year } from "../../../reusableComponent/JsonData";
import SearchIcon from "@mui/icons-material/Search";
import { Checkbox } from "@mui/material";
import { rows, columns } from "../../../reusableComponent/JsonData";
import {
  handleCSVExport,
  SearchLogic,
  handlePrint,
} from "../../../reusableComponent/commonlogic";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import NorthSharpIcon from "@mui/icons-material/NorthSharp";
import PaginationComponent from "../../../reusableComponent/paginationcomponent";
import ClickableChips from "@/app/reusableComponent/chips";
import { requestTable } from "../../../reusableComponent/JsonData";

type Row = {
  request_type: string;
  submitted_date: string;
  approved_by: string;
  status: string;
};

function Changereruestfilter() {
  const [ShowColumns, setShowColumns] = useState<boolean>(false);
  const [tableColumns, setTableColumns] = useState<any>(columns);
  const [searchList, setSearchList] = useState<any>(columns);
  const [tableRows, setTableRows] = useState<any>(rows);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [allRows, setAllRows] = useState<any>(rows);
  const columnRef = useRef<HTMLDivElement>(null);
  const [selectedTimeOff, setSelectedTimeOff] = useState("Request Time Off");
  const headers = rows?.length > 0 ? Object.keys(rows?.[0]) : [];
  const [pages, setPages] = useState([])
  const [countPerPage, setCountForPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = requestTable.length;
  const totalPages = Math.ceil(totalCount / countPerPage);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Row;
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        columnRef.current &&
        !columnRef.current.contains(event.target as Node)
      ) {
        setShowColumns(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (search !== "") {
      const filteredRows = SearchLogic(allRows, search);
      console.log("Filtered Results:", filteredRows);
      setTableRows(filteredRows?.length > 0 ? filteredRows : allRows);
    } else {
      setTableRows(allRows);
    }
  }, [search, allRows]);

  useEffect(() => {
    if (searchQuery !== "") {
      const filteredSearchQuery = SearchLogic(columns, searchQuery);

      setSearchList(
        filteredSearchQuery.length > 0 ? filteredSearchQuery : columns
      );
    } else {
      setSearchList(columns);
    }
  }, [searchQuery, columns]);


  useEffect(() => {
    const arr: any = [];
    for (let i = 1; i <= totalPages; i++) {
      arr.push(i);
    }
    setPages(arr);
  }, [totalPages]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleSort = (key: keyof Row) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    // const sortedRows = [...rows].sort((a, b) => {
    //   if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    //   if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    //   return 0;
    // });
    // setRows(sortedRows);
  };

  const currentPageItems = requestTable.slice(
    (currentPage - 1) * countPerPage,
    currentPage * countPerPage
  );

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-between">
          <div className="col-12 ">
            <div className="d-flex  justify-content-between mt-3 mb-2">
              <ul className="d-flex flex-wrap align-items-end gap-2 heading2 textheader cursorPointer p-0 mb-0">
                <li
                  className="d-flex align-items-center"
                  onClick={() => setShowColumns((prev) => !prev)}
                >
                  <CalendarViewWeekIcon />
                  <div className="dropdown mx-2">
                    <div
                      role="div"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                    >
                      Column
                    </div>

                    <div
                      className=" cursorPointer dropdown-menu px-1 "
                      style={{ width: "max-content" }}
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
                  </div>
                </li>

                <li className="d-flex align-items-center">
                  <FilterListIcon />
                  <span className="mx-2">Filters</span>
                </li>
                <li className="d-flex align-items-center">
                  <SaveAltIcon />
                  <div className="dropdown mx-2">
                    <div
                      role="div"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                    >
                      Export
                    </div>

                    <div
                      className="dropdown-menu p-2"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <p
                        className="m-0 para textheader"
                        onClick={() => handleCSVExport(headers, rows)}
                      >
                        CSV File
                      </p>
                      {/* <p
                      onClick={() => handlePrint()}
                      >Print</p> */}
                    </div>
                  </div>
                </li>
                <li className="d-flex align-items-center">
                  <HistoryIcon />
                  <div className="ms-2">
                    <DropdownComponent
                      dropdownlist={year}
                      removepadding={true}
                      selectedDatafunction={(data: any) =>
                        setSelectedTimeOff(data)
                      }
                    />
                  </div>
                </li>
                <li className="d-flex align-items-center">
                  <CalendarMonthIcon />
                  <div className="ms-2">
                    <DropdownComponent
                      dropdownlist={year}
                      removepadding={true}
                      selectedDatafunction={(data: any) =>
                        setSelectedTimeOff(data)
                      }
                    />
                  </div>
                </li>
              </ul>
              <div className="col-12 col-md-3 ">
                <div className="d-flex gap-1 searchbar ps-2 align-items-center">
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

          <div className="col-12" id="printSection">
            {/* <Requesttable /> */}
            <table className="table tabletype">
              <thead style={{ backgroundColor: "#F6F7FB" }}>
                <tr>
                  <th className="textheader para" scope="col">
                    Request type{" "}
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
                      onClick={() => handleSort("request_type")}
                    />
                  </th>
                  <th className="textheader para" scope="col">
                    Submitted Date
                    <NorthSharpIcon
                      fontSize="small"
                      className="inline-block"
                      sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                      onClick={() => handleSort("submitted_date")}
                    />
                  </th>
                  <th className="textheader para" scope="col">
                    Approved by
                    <NorthSharpIcon
                      fontSize="small"
                      className="inline-block"
                      sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                      onClick={() => handleSort("approved_by")}
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

                  <th className="textheader para" scope="col"></th>
                </tr>
              </thead>
              <tbody className="dashboardcard">
                {currentPageItems?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="para textheader">{item?.request_type}</td>
                    <td className="para textheader">{item?.submitted_date}</td>
                    <td className="para textheader">{item?.approved_by}</td>

                    <td className="para textheader">
                      <ClickableChips label={item.status} />
                    </td>
                    <td className="para textheader">{item.reason}</td>
                    <td className="para textheader">
                      <RemoveRedEyeIcon
                        sx={{ color: "#8A8D93" }}
                        //   onClick={() => setDetails(true)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-end my-3">
              <PaginationComponent
                currentPage={currentPage}
                currentPageFunction={handlePageChange}
                pages={pages}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Changereruestfilter;
