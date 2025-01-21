import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl } from "@mui/material";
import { add, format, endOfMonth, startOfMonth } from "date-fns";
import Cell from "./Cell";
import { SelectChangeEvent } from "@mui/material";

interface SemiMonthlyCalendarProps {
  value?: Date;
  onChange: (date: Date) => void;
}

interface MonthPart {
  monthIndex: number;
  part: "first" | "second";
}

const SemiMonthlyCalendar: React.FC<SemiMonthlyCalendarProps> = ({ value = new Date(), onChange }) => {
  const today = new Date();
  const isSecondPart = today.getDate() > 15;

  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [selectedMonthPart, setSelectedMonthPart] = useState<MonthPart>({
    monthIndex: today.getMonth(),
    part: isSecondPart ? "second" : "first",
  });

  useEffect(() => {
    onChange(today); // Notify the parent component with the initial date (today)
  }, []);
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
      end = new Date(year, monthIndex, 15);
    } else {
      start = new Date(year, monthIndex, 16);
      end = endOfMonth(start);
    }

    return { start, end };
  };

  const handleMonthPartChange = (event: SelectChangeEvent<string>) => {
    const selected = splitMonths.find((m) => m.label === event.target.value);
    if (selected) {
      setSelectedMonthPart({
        monthIndex: selected.monthIndex,
        part: selected.part as "first" | "second",
      });
      const { start } = calculateRange(selected.monthIndex, selected.part as "first" | "second", selectedYear);
      // setSelectedDate(start);
      onChange(start);
    }
  };

  const handleYearChange = (event: SelectChangeEvent<unknown>) => {
    const year = Number(event.target.value);
    setSelectedYear(year);
    const { start } = calculateRange(selectedMonthPart.monthIndex, selectedMonthPart.part, year);
    // setSelectedDate(start);
    onChange(start);
  };

  const { start, end } = calculateRange(selectedMonthPart.monthIndex, selectedMonthPart.part, selectedYear);
  const startRange = start;
  const totalDaysInRange = end.getDate() - start.getDate() + 1;
  const startDay = (startRange.getDay() === 0 ? 7 : startRange.getDay());

  return (
    <div className="pb-4 pe-3">
      <div className="flex">
        <FormControl sx={{ width: "fit-content" }}>
          <Select
            className="textheader para"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              outline: "none",
            }}
            value={splitMonths.find(
              (m) => m.monthIndex === selectedMonthPart.monthIndex && m.part === selectedMonthPart.part
            )?.label}
            onChange={handleMonthPartChange}
          >
            {splitMonths.map((month: any, index: number) => (
              <MenuItem key={index} value={month.label}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: "fit-content" }}>
          <Select
            className="textheader para"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              outline: "none",
            }}
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

      <div className="grid grid-cols-7 items-center justify-center text-center">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((week, index) => (
          <Cell key={index} className="para2 unselectcolor">
            {week}
          </Cell>
        ))}

        {Array.from({ length: startDay - 1 }).map((_, index) => (
          <Cell key={index} />
        ))}

        {Array.from({ length: totalDaysInRange }).map((_, index) => {
          const date = add(startRange, { days: index });
          const isCurrentDate = format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          return (
            <Cell
              key={index}
              isActive={isCurrentDate}
              className="relative rounded para2 textheader"
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
