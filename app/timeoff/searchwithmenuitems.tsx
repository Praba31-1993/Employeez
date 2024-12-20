"use client";
import React, { useEffect, useState, useRef } from "react";
import "./timeoff.css";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import FilterListIcon from "@mui/icons-material/FilterList";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import HistoryIcon from "@mui/icons-material/History";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DropdownComponent from "../reusableComponent/dropdown";
import { year } from "../reusableComponent/JsonData";
import SearchIcon from "@mui/icons-material/Search";
import TableWithSort from "../reusableComponent/table/tablewithSort";
import { Checkbox } from "@mui/material";
import { rows, columns } from "../reusableComponent/JsonData";
import { SearchLogic } from "../reusableComponent/commonlogic";

function Searchwithmenuitems() {
    const [ShowColumns, setShowColumns] = useState<boolean>(false);
    const [tableColumns, setTableColumns] = useState<any>(columns);
    const [searchList, setSearchList] = useState<any>(columns);
    const [tableRows, setTableRows] = useState<any>(rows);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [allRows, setAllRows] = useState<any>(rows);
    const columnRef = useRef<HTMLDivElement>(null);

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
                setShowColumns(false); // Close the menu if clicking outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside); // Listen for clicks
        return () => document.removeEventListener("mousedown", handleClickOutside); // Cleanup the listener
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

    return (
        <>
            <div className="container-fluid">
                <div className="">
                    {ShowColumns && (
                        <div
                            className="dashboardcard columnListCard cursorPointer"
                            ref={columnRef}
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

                {/* <div className="row justify-content-end">
         
        </div> */}

                <div className="row justify-content-between">
                    <div className="col-12 ">
                        <div className="d-flex  justify-content-between mt-3 mb-2">
                            <ul className="d-flex flex-wrap align-items-end gap-2 heading2 textheader cursorPointer p-0 mb-0">
                                <li
                                    className="d-flex align-items-center"
                                    onClick={() => setShowColumns((prev) => !prev)}
                                >
                                    <CalendarViewWeekIcon />
                                    <span className="mx-2 ">Column</span>
                                </li>

                                <li className="d-flex align-items-center">
                                    <FilterListIcon />
                                    <span className="mx-2">Filters</span>
                                </li>
                                <li className="d-flex align-items-center">
                                    <SaveAltIcon />
                                    <span className="mx-2">Export</span>
                                </li>
                                <li className="d-flex align-items-center">
                                    <HistoryIcon />
                                    <div className="ms-2">
                                        <DropdownComponent dropdownlist={year} removepadding={true}/>
                                    </div>
                                </li>
                                <li className="d-flex align-items-center">
                                    <CalendarMonthIcon />
                                    <div className="ms-2">
                                        <DropdownComponent dropdownlist={year}  removepadding={true} />
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

                    <div className="col-12">
                        <TableWithSort
                            columns={tableColumns}
                            rows={tableRows}
                            dataforicons={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Searchwithmenuitems;