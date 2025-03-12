"use client";
import { startOfWeek, add, format, parseISO } from "date-fns";
import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import "./rcalendar.css";
 
const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
 
type Props = {
  value?: Date;
  onChange: (date: Date) => void;
  calendardatas: any; // Assuming this is an array of data
  weeklyList: (weeklist: any) => void;
  handleSelectedMonth:(month:any,year:any )=>void;
};
 
const MonthlyCalendar: React.FC<Props> = ({
  value = new Date(),
  onChange,
  calendardatas,
  weeklyList,
  handleSelectedMonth
}) => {
  const [selectedDate, setSelectedDate] = useState(value);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState(value.getFullYear());
  const [dropdownRange, setDropdownRange] = useState<string | undefined>(
    "01/01/2024 - 14/01/2024" // Default MenuItem
  );
  const [clickedDateData, setClickedDateData] = useState<any>(null); // Store clicked date's data
  const [weekData, setWeekData] = useState<
    Array<{ day: string; date: string }>
  >([]);
 
  useEffect(() => {
    const start = new Date(selectedYear, selectedMonth, 1);
    const end = new Date(selectedYear, selectedMonth + 1, 0);
 
    const newRange = `${format(start, "dd/MM/yyyy")} - ${format(
      end,
      "dd/MM/yyyy"
    )}`;
    setDropdownRange(newRange);
  }, [selectedYear, selectedMonth]);
 
  useEffect(() => {
    if (weekData.length > 0) {
      weeklyList(weekData); // Pass updated weekData to parent when it changes
    }
  }, [weekData, weeklyList]);
 
  // Define the start and end of the selected range
  const [startRange, endRange] = dropdownRange
    ? dropdownRange.split(" - ").map((date) => {
        const [day, month, year] = date.split("/").map(Number);
        return new Date(year, month - 1, day);
      })
    : [new Date(), new Date()];
 
  const totalDaysInRange =
    Math.floor(
      (endRange.getTime() - startRange.getTime()) / (1000 * 3600 * 24)
    ) + 1;
 
  const firstDayOfWeek = startRange.getDay();
  const prefixDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
 
  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    const month = Number(event.target.value);
    setSelectedMonth(month);
  };
 
  const handleYearChange = (event: SelectChangeEvent<string>) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);
 
    const newStart = new Date(year, selectedMonth, startRange.getDate());
    const newEnd = new Date(year, selectedMonth, endRange.getDate());
 
    setDropdownRange(
      `${format(newStart, "dd/MM/yyyy")} - ${format(newEnd, "dd/MM/yyyy")}`
    );
    setSelectedDate(newStart);
    onChange(newStart);
  };
 
  // Map calendardatas to a lookup object by calDate for fast access
  const calendardataMap = calendardatas.reduce((acc: any, item: any) => {
    const formattedDate = format(parseISO(item.calDate), "yyyy-MM-dd");
    acc[formattedDate] = item;
    return acc;
  }, {});
 
  const handleDateClick = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const dataForDate = calendardataMap[formattedDate];
 
    if (dataForDate) {
        setClickedDateData(dataForDate);
    }
 
    // Calculate the week containing the clicked date
    const startOfTheWeek = startOfWeek(date, { weekStartsOn: 1 }); // Monday as the first day
    const clickedWeekDatas = Array.from({ length: 7 }).map((_, index) => {
        const currentDate = add(startOfTheWeek, { days: index });
        return {
            day: format(currentDate, "EEE"),
            date: format(currentDate, "dd-MM-yyyy"),
            month: format(currentDate, "MMMM"),
            year: format(currentDate, "yyyy"),
            monthDay: `${format(currentDate, "MMM")}${format(currentDate, "dd")}`, // Merge month and day
        };
    });
 
    setWeekData(clickedWeekDatas);
    setSelectedDate(date);
    onChange?.(date); // Notify parent if onChange is provided
};
 
// Automatically trigger a "click" on the current date when the component mounts
useEffect(() => {
    const today = new Date();
    handleDateClick(today);
 
}, []); // Empty dependency array ensures this runs only once
 
useEffect(()=>{
  handleSelectedMonth(selectedMonth, selectedYear)
 
},[selectedMonth,selectedYear])
 
  return (
    <div className=" pb-4 pe-3">
      <h4 className="textheader heading mt-2"> Timesheet</h4>
      <div className="flex gap-3 me-5">
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="textheader para"
            value={selectedMonth}
            displayEmpty
            inputProps={{
              "aria-label": "Without label",
              style: { border: "none", outline: "none" }, // Apply directly to the input
            }}
            onChange={handleMonthChange}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove border from the outline
              },
              outline: "none",
            }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <MenuItem key={i} value={i}>
                {format(new Date(0, i), "MMMM")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
 
        <FormControl fullWidth>
          <Select
            labelId="year-select-label"
            id="year-select"
            className="textheader  para"
            value={selectedYear.toString()}
            onChange={handleYearChange}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove border from the outline
              },
              outline: "none",
            }}
          >
            {Array.from({ length: 10 }, (_, i) => {
              const year = new Date().getFullYear() - 5 + i;
              return (
                <MenuItem key={year} value={year.toString()}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
 
      {/* Weekdays */}
      <div className="grid grid-cols-7 items-center justify-center text-center">
        {weeks.map((week, index) => (
          <Cell key={index} className="para2 unselectcolor">
            {week}
          </Cell>
        ))}
 
        {/* Empty cells before the start of the range */}
        {Array.from({ length: prefixDays }).map((_, index) => (
          <Cell key={index} />
        ))}
 
        {/* Dates within the specified range */}
        {Array.from({ length: totalDaysInRange }).map((_, index) => {
          const date = add(startRange, { days: index });
          const formattedDate = format(date, "yyyy-MM-dd");
          const isCurrentDate =
            formattedDate === format(selectedDate, "yyyy-MM-dd");
          const valueForDate = calendardataMap[formattedDate];
 
          return (
            <Cell
              key={index}
              isActive={isCurrentDate}
              onClick={() => handleDateClick(date)}
              isHighlighted={!!valueForDate} // Highlight if data exists
              className="relative para2 rounded textheader"
            >
              {format(date, "d")}
              {/* Show value on hover with inline styles */}
              {valueForDate && (
                <div className="dates ">{valueForDate.value}</div>
              )}
            </Cell>
          );
        })}
      </div>
    </div>
  );
};
 
export default MonthlyCalendar;
 