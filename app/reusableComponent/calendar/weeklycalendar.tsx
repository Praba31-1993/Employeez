"use client";
import { add, format, startOfWeek, endOfWeek, startOfYear, endOfYear } from "date-fns";
import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Props = {
  value?: Date;
  onChange: (date: Date) => void;
};

const WeeklyCalendar: React.FC<Props> = ({ value = new Date(), onChange }) => {
  // Utilities
  const getCurrentWeekRange = (date: Date) => {
    const startDate = startOfWeek(date, { weekStartsOn: 1 }); // Monday as the first day of the week
    const endDate = endOfWeek(date, { weekStartsOn: 1 }); // Sunday as the last day
    return {
      startDate,
      endDate,
      range: `${format(startDate, "dd/MM/yyyy")} - ${format(endDate, "dd/MM/yyyy")}`,
    };
  };

  // Initialization
  const initialCurrentWeek = getCurrentWeekRange(value);
  const initialCurrentYear = value.getFullYear();

  // States
  const [selectedDate, setSelectedDate] = useState<Date>(value);
  const [selectedYear, setSelectedYear] = useState<number>(initialCurrentYear);
  const [dropdownRanges, setDropdownRanges] = useState<string[]>([]);
  const [dropdownRange, setDropdownRange] = useState<string>(initialCurrentWeek.range);

  // Generate dropdown ranges for the year
  useEffect(() => {
    const start = startOfYear(new Date(selectedYear, 0, 1));
    const end = endOfYear(new Date(selectedYear, 0, 1));

    let weeksInYear: string[] = [];
    let currentStart = start;

    while (currentStart <= end) {
      const currentEnd = endOfWeek(currentStart, { weekStartsOn: 1 });
      const weekRange = `${format(currentStart, "dd/MM/yyyy")} - ${format(currentEnd, "dd/MM/yyyy")}`;
      weeksInYear.push(weekRange);
      currentStart = add(currentEnd, { days: 1 }); // Move to the next week
    }

    setDropdownRanges(weeksInYear);

    // Auto-select the current week if it's within the current year
    if (weeksInYear.includes(initialCurrentWeek.range)) {
      setDropdownRange(initialCurrentWeek.range);
      setSelectedDate(initialCurrentWeek.startDate);
    }
  }, [selectedYear, initialCurrentWeek.range]);

  // Handle range change
  const handleRangeChange = (event: SelectChangeEvent<string>) => {
    const range = event.target.value;
    const [start, end] = range.split(" - ").map((date) => {
      const [day, month, year] = date.split("/").map(Number);
      return new Date(year, month - 1, day);
    });

    setDropdownRange(range);
    setSelectedDate(start);
    onChange(start); // Trigger onChange callback with the start date
  };

  // Handle year change
  const handleYearChange = (event: SelectChangeEvent<string>) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);
  };

  // Generate days for the selected range
  const generateDays = () => {
    const [start, end] = dropdownRange.split(" - ").map((date) => {
      const [day, month, year] = date.split("/").map(Number);
      return new Date(year, month - 1, day);
    });

    const totalDaysInRange =
      Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;

    const firstDayOfWeek = start.getDay();
    const prefixDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    return {
      totalDaysInRange,
      startDate: start,
      prefixDays,
    };
  };

  const { totalDaysInRange, startDate, prefixDays } = generateDays();

  return (
    <div className="pb-4 pe-3">
      <div className="flex">
        {/* Week Range Dropdown */}
        <FormControl sx={{ width: "fit-content" }}>
          <Select
            value={dropdownRange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            onChange={handleRangeChange}
            className="textheader para"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              outline: "none",
            }}
          >
            {dropdownRanges.map((range, index) => (
              <MenuItem key={index} value={range}>
                {range}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Year Dropdown */}
        <FormControl sx={{ width: "fit-content" }}>
          <Select
            value={selectedYear.toString()}
            onChange={handleYearChange}
            className="textheader para"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
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

        {/* Dates within the selected range */}
        {Array.from({ length: totalDaysInRange }).map((_, index) => {
          const date = add(startDate, { days: index });
          const isCurrentDate = format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

          return (
            <Cell
              key={index}
              isActive={isCurrentDate}
              className={`relative rounded para2 textheader ${
                isCurrentDate ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => {
                setSelectedDate(date);
                onChange(date);
              }}
            >
              {format(date, "d")}
            </Cell>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
