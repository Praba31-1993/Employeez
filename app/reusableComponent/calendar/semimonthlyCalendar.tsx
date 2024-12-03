import React, { useState, ChangeEvent } from "react";
import { Select, MenuItem, FormControl } from "@mui/material";
import { add, format, endOfMonth } from "date-fns";
import Cell from "./Cell";
import { SelectChangeEvent } from "@mui/material"; 
// Type for the props of the SemiMonthlyCalendar component
interface SemiMonthlyCalendarProps {
  value?: Date;  // Optional prop for the initial date
  onChange: (date: Date) => void;  // Callback function for when the date changes
}

// Type for the selected month part (e.g., "first" or "second" part of the month)
interface MonthPart {
  monthIndex: number;
  part: "first" | "second"; 
}

const SemiMonthlyCalendar: React.FC<SemiMonthlyCalendarProps> = ({ value = new Date(), onChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(value);
  const [selectedYear, setSelectedYear] = useState<number>(value.getFullYear());

  const [selectedMonthPart, setSelectedMonthPart] = useState<MonthPart>({
    monthIndex: 0,
    part: "first", // Default to "first" part
  });

  const splitMonths = [
    { label: "Jan 1", monthIndex: 0, part: "first" },
    { label: "Jan 2", monthIndex: 0, part: "second" },
    { label: "Feb 1", monthIndex: 1, part: "first" },
    { label: "Feb 2", monthIndex: 1, part: "second" },
    { label: "Mar 1", monthIndex: 2, part: "first" },
    { label: "Mar 2", monthIndex: 2, part: "second" },
    { label: "Apr 1", monthIndex: 3, part: "first" },
    { label: "Apr 2", monthIndex: 3, part: "second" },
    { label: "May 1", monthIndex: 4, part: "first" },
    { label: "May 2", monthIndex: 4, part: "second" },
    { label: "Jun 1", monthIndex: 5, part: "first" },
    { label: "Jun 2", monthIndex: 5, part: "second" },
    { label: "Jul 1", monthIndex: 6, part: "first" },
    { label: "Jul 2", monthIndex: 6, part: "second" },
    { label: "Aug 1", monthIndex: 7, part: "first" },
    { label: "Aug 2", monthIndex: 7, part: "second" },
    { label: "Sep 1", monthIndex: 8, part: "first" },
    { label: "Sep 2", monthIndex: 8, part: "second" },
    { label: "Oct 1", monthIndex: 9, part: "first" },
    { label: "Oct 2", monthIndex: 9, part: "second" },
    { label: "Nov 1", monthIndex: 10, part: "first" },
    { label: "Nov 2", monthIndex: 10, part: "second" },
    { label: "Dec 1", monthIndex: 11, part: "first" },
    { label: "Dec 2", monthIndex: 11, part: "second" },
  ];

  const calculateRange = (monthIndex: number, part: "first" | "second", year: number) => {
    const startDate = new Date(year, monthIndex, 1);
    let start: Date, end: Date;

    if (part === "first") {
      start = startDate;
      end = new Date(year, monthIndex, 15); // First half: 1st to 15th
    } else {
      start = new Date(year, monthIndex, 16); // Second half: 16th to the end of the month
      end = endOfMonth(start); // Get the last day of the month
    }

    return { start, end };
  };

  const handleMonthPartChange = (event: SelectChangeEvent<string>) => {
    const selected = splitMonths.find((m) => m.label === event.target.value);
    
    if (selected && (selected.part === "first" || selected.part === "second")) {
      setSelectedMonthPart({
        monthIndex: selected.monthIndex,
        part: selected.part, // Now TypeScript knows this is safe
      });
  
      const { start, end } = calculateRange(selected.monthIndex, selected.part, selectedYear);
      setSelectedDate(start);
      onChange(start);
    }
  };
  

  const handleYearChange = (event: SelectChangeEvent<unknown>) => {
    const year = Number(event.target.value); // Convert string to number
    setSelectedYear(year); // Now this is a number, so it's compatible with your state
  
    const { start, end } = calculateRange(selectedMonthPart.monthIndex, selectedMonthPart.part, year);
    setSelectedDate(start);
    onChange(start);
  };

  // Calculate startRange and totalDaysInRange
  const { start, end } = calculateRange(selectedMonthPart.monthIndex, selectedMonthPart.part, selectedYear);
  const startRange = start;
  const totalDaysInRange = (end.getDate() - start.getDate()) + 1; // Calculate total days in the range

  // Adjust to start from Monday (where Sunday = 0, Monday = 1)
  const startDay = (startRange.getDay() === 0 ? 7 : startRange.getDay()); // If Sunday, treat it as 7 (Monday start)
  
  return (
    <div className="border-t border-l py-4">
      <div className="flex gap-3 mx-3">
        <FormControl sx={{ width: "fit-content" }}>
          <Select
            className="heading2 ms-1 textheader bg-transparent"
            sx={{ outline: "0px !important" }}
            value={splitMonths.find(
              (m) => m.monthIndex === selectedMonthPart.monthIndex && m.part === selectedMonthPart.part
            )?.label}
            onChange={handleMonthPartChange}
          >
            {splitMonths.map((month) => (
              <MenuItem key={month.label} value={month.label}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: "fit-content" }}>
          <Select
            className="heading2 ms-3 textheader bg-transparent"
            sx={{ outline: "0px !important" }}
            value={selectedYear}
            onChange={handleYearChange}
          >
            {Array.from({ length: 10 }, (_, i) => selectedYear - 5 + i).map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 items-center justify-center text-center">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((week, index) => (
          <Cell key={index} className="text-xs font-bold uppercase">
            {week}
          </Cell>
        ))}

        {/* Empty cells before the start of the range */}
        {Array.from({ length: startDay - 1 }).map((_, index) => (
          <Cell key={index} />
        ))}

        {/* Dates within the specified range */}
        {Array.from({ length: totalDaysInRange }).map((_, index) => {
          const date = add(startRange, { days: index });
          const isCurrentDate = format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          return (
            <Cell
              key={index}
              isActive={isCurrentDate}
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

export default SemiMonthlyCalendar;
