"use client";
import React from "react";
import "./timeoff.css";
import ImageComponent from "../reusableComponent/image";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import FilterListIcon from "@mui/icons-material/FilterList";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import HistoryIcon from "@mui/icons-material/History";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
function Searchwithmenuitems() {
  return (
    <>
      <div className="d-flex justify-content-between w-100 align-items-center">
        <ul className="d-flex gap-2 heading2 textheader">
          <li>
            <CalendarViewWeekIcon />
            <span className="mx-2">column</span>
          </li>
          <li>
            <FilterListIcon />
            <span className="mx-2">Filters</span>
          </li>
          <li>
            <SaveAltIcon />
            <span className="mx-2">Export</span>
          </li>
          <li>
            <HistoryIcon />
            <span className="mx-2">Select View</span>
          </li>
          <li>
            <CalendarMonthIcon />
            <span className="mx-2">Select View</span>
          </li>
        </ul>

        <div className="">
          <input
            type="text"
            name="search"
            placeholder="Search.."
            className="searchbar"
          />
        </div>
      </div>
    </>
  );
}

export default Searchwithmenuitems;
