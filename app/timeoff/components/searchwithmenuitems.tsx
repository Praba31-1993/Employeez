"use client";
import React, { useEffect, useState, useRef } from "react";
import "../timeoff.css";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import FilterListIcon from "@mui/icons-material/FilterList";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import HistoryIcon from "@mui/icons-material/History";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import { Checkbox } from "@mui/material";
import NorthSharpIcon from "@mui/icons-material/NorthSharp";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { rows, columns, year } from "@/app/reusableComponent/JsonData";
import { SearchLogic } from "@/app/reusableComponent/commonlogic";
import DropdownComponent from "@/app/reusableComponent/dropdown";
import ClickableChips from "@/app/reusableComponent/chips";
import { CenterPopup } from "@/app/reusableComponent/popup/centerPopup";
import Paginationcomponent from "@/app/reusableComponent/paginationcomponent";

type Row = {
    employeeID: string;
    employeename: string;
    date_from: string;
    date_to: string;
    time_off_type: string;
    status: string;
    reason: string;
    action: string;
};

function Searchwithmenuitems() {
    const [tableColumns, setTableColumns] = useState<any>(columns);
    const [searchList, setSearchList] = useState<any>(columns);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const columnRef = useRef<HTMLDivElement>(null);
    const ExportRef = useRef<HTMLDivElement>(null);
    const [showdetails, setDetails] = useState(false);
    const [selectedTimeOff, setSelectedTimeOff] = useState("Request Time Off");

    const [openColumn, setOpenColumn] = useState<Boolean>(false);
    const [openExport, setOpenExport] = useState<Boolean>(false);
    const [pages, setPages] = useState([]);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Row;
        direction: "asc" | "desc";
    } | null>(null);
    const [countPerPage, setCountForPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsList, setRows] = useState<Row[]>(rows);
    const totalCount = rowsList.length;
    const totalPages = Math.ceil(totalCount / countPerPage);

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
                setOpenColumn(false);
            }

            if (
                ExportRef.current &&
                !ExportRef.current.contains(event.target as Node)
            ) {
                setOpenExport(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

    // Handle page change
    const goToPage = (page: number) => {
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

        const sortedRows = [...rows].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });
        setRows(sortedRows);
    };
    useEffect(() => {
        const arr: any = [];
        for (let i = 1; i <= totalPages; i++) {
            arr.push(i);
        }
        setPages(arr);
    }, [totalPages]);

    const currentPageItems = rowsList.slice(
        (currentPage - 1) * countPerPage,
        currentPage * countPerPage
    );

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="container-fluid px-0">
                <div className="row justify-content-between px-0">
                    <div className="col-12 px-0">
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
                                            <div
                                                role="div"
                                                id="dropdownMenuLink"
                                                data-bs-toggle="dropdown"
                                            >
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
                            <div className="col-12 col-md-3 d-none d-sm-block">
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

                    <div className="col-12 px-0" id="printSection">
                        <div className="w-100" style={{ overflowX: "auto" }}>
                            <table className="table tabletype">
                                <thead style={{ backgroundColor: "#F6F7FB" }}>
                                    <tr>
                                        <th className="textheader para" scope="col">
                                            Employee ID{" "}
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
                                                onClick={() => handleSort("date_from")}
                                            />
                                        </th>
                                        <th className="textheader para" scope="col">
                                            Employee name
                                            <NorthSharpIcon
                                                fontSize="small"
                                                className="inline-block"
                                                sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                                                onClick={() => handleSort("date_to")}
                                            />
                                        </th>
                                        <th className="textheader para" scope="col">
                                            Date from
                                            <NorthSharpIcon
                                                fontSize="small"
                                                className="inline-block"
                                                sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                                                onClick={() => handleSort("time_off_type")}
                                            />
                                        </th>
                                        <th className="textheader para" scope="col">
                                            Date to
                                            <NorthSharpIcon
                                                fontSize="small"
                                                className="inline-block"
                                                sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                                                onClick={() => handleSort("status")}
                                            />
                                        </th>
                                        <th className="textheader para" scope="col">
                                            Time off type
                                            <NorthSharpIcon
                                                fontSize="small"
                                                className="inline-block"
                                                sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                                                onClick={() => handleSort("reason")}
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
                                            Reason
                                            <NorthSharpIcon
                                                fontSize="small"
                                                className="inline-block"
                                                sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                                                onClick={() => handleSort("reason")}
                                            />
                                        </th>
                                        <th className="textheader para" scope="col">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="dashboardcard">
                                    {currentPageItems?.map((item, index) => (
                                        <tr key={index}>
                                            <td className="para textheader">{item?.employeeID}</td>
                                            <td className="para textheader">{item?.employeename}</td>
                                            <td className="para textheader">{item?.date_from}</td>
                                            <td className="para textheader">{item?.date_to}</td>
                                            <td className="para textheader">{item?.time_off_type}</td>

                                            <td className="para textheader">
                                                <ClickableChips label={item.status} />
                                            </td>
                                            <td className="para textheader">{item.reason}</td>
                                            <td className="para textheader">
                                                <RemoveRedEyeIcon
                                                    sx={{ color: "#8A8D93" }}
                                                    onClick={() => setDetails(true)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex justify-content-end my-3">
                            <Paginationcomponent
                                currentPage={currentPage}
                                currentPageFunction={handlePageChange}
                                pages={pages}
                                totalPages={totalPages}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {showdetails && (
                <CenterPopup show={showdetails} close={() => setDetails(false)} />
            )}
        </>
    );
}

export default Searchwithmenuitems;
