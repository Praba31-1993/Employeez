import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker({ startDate, endDate }: any) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleDateChange = (newDate: any) => {
    setSelectedDate(newDate);
    if (newDate) {
      const formattedDate = newDate.format("dddd, YYYY-MM-DD").toLowerCase();
      startDate(formattedDate)
      console.log(formattedDate);
    }
  };

  const handleDateEndChange = (newDate: any) => {
    setSelectedEndDate(newDate);
    if (newDate) {
      const formattedDate = newDate.format("dddd, YYYY-MM-DD").toLowerCase();
      endDate(formattedDate)
      console.log(formattedDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Basic date picker"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <DatePicker
          label="Basic date picker"
          value={selectedEndDate}
          onChange={handleDateEndChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
