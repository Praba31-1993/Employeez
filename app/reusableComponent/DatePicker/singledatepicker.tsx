import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Colors } from "../styles";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

export default function SingleDatePicker({ startDate, endDate }: any) {
  const useColors = Colors();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [showCard, setShowCard] = useState(false); // State for controlling visibility of the card

  const handleDateChange = (newDate: any) => {
    setSelectedDate(newDate);
    if (newDate) {
      const formattedDate = newDate.format("dddd, YYYY-MM-DD").toLowerCase();
      startDate(formattedDate);
    }
  };

  const handleDateEndChange = (newDate: any) => {
    setSelectedEndDate(newDate);
    if (newDate) {
      const formattedDate = newDate.format("dddd, YYYY-MM-DD").toLowerCase();
      endDate(formattedDate);
    }
  };

  const toggleCardVisibility = () => {
    setShowCard((prevState) => !prevState); // Toggle the visibility
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Label with click handler to toggle visibility */}
      <p
        className="mb-0 textheader cursorpointer"
        onClick={toggleCardVisibility}
      >
        Select range <KeyboardArrowDownOutlinedIcon />
      </p>

      {/* Conditionally render dashboardcard */}
      {showCard && (
        <div
          className="dashboardcard p-3"
          style={{ position: "absolute", top: "30px", left: "0", zIndex: "1" }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Select date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>

          <div
            className="d-flex justify-content-end py-3"
            onClick={() => setShowCard(false)}
          >
            <div
              className="rounded"
              style={{
                border: `1px solid ${useColors.themeRed}`,
                width: "fit-content",
              }}
            >
              <FilterAltOutlinedIcon
                className=" m-1"
                sx={{ color: useColors.themeRed }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
