import { add, format, startOfYear, endOfYear } from "date-fns";
import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Props = {
  value?: Date;
  onChange: (date: Date) => void;
};

const BiWeeklyCalendar: React.FC<Props> = ({ value = new Date(), onChange }) => {
  const [selectedDate, setSelectedDate] = useState(value);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(value.getFullYear());
  const [dropdownRanges, setDropdownRanges] = useState<string[]>([]);
  const [dropdownRange, setDropdownRange] = useState<string>("01/01/2024 - 07/01/2024"); // Default value

  // This effect will update the dropdown ranges when the selected year changes
  useEffect(() => {
    const start = startOfYear(new Date(selectedYear, 0, 1)); // Start of the selected year
    const end = endOfYear(new Date(selectedYear, 0, 1)); // End of the selected year

    let weeksInYear: string[] = [];
    let currentStart = start;

    // Generate weeks in the year
    while (currentStart <= end) {
      const currentEnd = add(currentStart, { days: 13 }); // 7-day week range
      const weekRange = `${format(currentStart, "dd/MM/yyyy")} - ${format(
        currentEnd,
        "dd/MM/yyyy"
      )}`;
      weeksInYear.push(weekRange);
      currentStart = add(currentEnd, { days: 1 }); // Move to next week
    }

    setDropdownRanges(weeksInYear); // Update the dropdown ranges
    setDropdownRange(weeksInYear[0]); // Set the default value to the first range
  }, [selectedYear]);

  // Parse date range correctly
  const parseDateRange = (range: string) => {
    if (!range) return { startDate: new Date(), endDate: new Date() }; // Add a fallback

    const [startDateStr, endDateStr] = range.split(" - ");
    const [startDay, startMonth, startYear] = startDateStr.split("/").map(Number);
    const [endDay, endMonth, endYear] = endDateStr.split("/").map(Number);

    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);

    return { startDate, endDate };
  };

  // Handle range change
  const handleRangeChange = (event: SelectChangeEvent<string>) => {
    const range = event.target.value;
    const { startDate, endDate } = parseDateRange(range);

    setDropdownRange(range); // Update the selected dropdown range
    setSelectedDate(startDate); // Update the selected date
    onChange(startDate); // Trigger the onChange callback
  };

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);
    setSelectedDate(new Date(year, selectedMonth, 1));
    onChange(new Date(year, selectedMonth, 1));
  };

  // Generate the days based on the selected range
  const generateDays = () => {
    const { startDate, endDate } = parseDateRange(dropdownRange);
    const totalDaysInRange =
      Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;

    const firstDayOfWeek = startDate.getDay();
    const prefixDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    return {
      totalDaysInRange,
      startDate,
      prefixDays,
    };
  };

  const { totalDaysInRange, startDate, prefixDays } = generateDays();

  return (
    <div className="border-t border-l py-4">
      <div className="flex gap-3 mx-3">
        <FormControl sx={{ width: "fit-content" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dropdownRange} // Bind the value of the Select to the state
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            onChange={handleRangeChange}
          >
            {dropdownRanges.map((range, index) => (
              <MenuItem key={index} value={range}>
                {range}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: "fit-content" }}>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear.toString()} // Convert number to string for Material-UI compatibility
            onChange={handleYearChange}
          >
            {Array.from({ length: 10 }, (_, i) => {
              const year = new Date().getFullYear() - 5 + i; // Generates a range of 10 years
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
          <Cell key={index} className="text-xs font-bold uppercase">
            {week}
          </Cell>
        ))}

        {/* Empty cells before the start of the range */}
        {Array.from({ length: prefixDays }).map((_, index) => (
          <Cell key={index} />
        ))}

        {/* Dates within the specified range */}
        {Array.from({ length: totalDaysInRange }).map((_, index) => {
          const date = add(startDate, { days: index });
          const isCurrentDate =
            format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

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

export default BiWeeklyCalendar;
