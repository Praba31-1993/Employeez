"use client";
import {
  add,
  format,
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
  parseISO,
} from "date-fns";
import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Props = {
  value?: Date;
  onChange: (date: Date) => void;
  weeklyList: (weeklist: any) => void;
  handleSelectedMonth: (month: any, year: any) => void;
  calendardatas: any;
};

const WeeklyCalendar: React.FC<Props> = ({
  value = new Date(),
  onChange,
  weeklyList,
  handleSelectedMonth,
  calendardatas,
}) => {
  // Utility to calculate the start and end of the week
  const getCurrentWeekRange = (date: Date) => {
    const startDate = startOfWeek(date, { weekStartsOn: 1 }); // Monday as the first day
    const endDate = endOfWeek(date, { weekStartsOn: 1 }); // Sunday as the last day
    return {
      startDate,
      endDate,
      range: `${format(startDate, "dd/MM/yyyy")} - ${format(
        endDate,
        "dd/MM/yyyy"
      )}`,
    };
  };

  // Initial values for today and its week range
  const today = new Date();
  const initialCurrentWeek = getCurrentWeekRange(today);

  // States
  const [selectedDate, setSelectedDate] = useState<Date>(today); // Highlight the current date by default
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [dropdownRanges, setDropdownRanges] = useState<string[]>([]);
  const [clickedDateData, setClickedDateData] = useState<any>(null); // Store clicked date's data

  const [dropdownRange, setDropdownRange] = useState<string>(
    initialCurrentWeek.range
  );
  const [weekData, setWeekData] = useState<
    Array<{ day: string; date: string }>
  >([]);

  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );

  // Generate dropdown ranges for all weeks in the year
  useEffect(() => {
    const start = startOfYear(new Date(selectedYear, 0, 1));
    const end = endOfYear(new Date(selectedYear, 0, 1));

    const weeksInYear: string[] = [];
    let currentStart = start;

    while (currentStart <= end) {
      const currentEnd = endOfWeek(currentStart, { weekStartsOn: 1 });
      const weekRange = `${format(currentStart, "dd/MM/yyyy")} - ${format(
        currentEnd,
        "dd/MM/yyyy"
      )}`;
      weeksInYear.push(weekRange);
      currentStart = add(currentEnd, { days: 1 });
    }

    setDropdownRanges(weeksInYear);

    // Ensure the current week is selected by default
    if (weeksInYear.includes(initialCurrentWeek.range)) {
      setDropdownRange(initialCurrentWeek.range);
      setSelectedDate(today); // Highlight the current date
    }
  }, [selectedYear, initialCurrentWeek.range]);

  // Handle dropdown range change
  const handleRangeChange = (event: SelectChangeEvent<string>) => {
    const range = event.target.value;
    const [start] = range.split(" - ").map((date) => {
      const [day, month, year] = date.split("/").map(Number);
      return new Date(year, month - 1, day);
    });

    setDropdownRange(range);
    // setSelectedDate(start);
    onChange(start); // Trigger onChange callback
  };

  // Handle year dropdown change
  const handleYearChange = (event: SelectChangeEvent<string>) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);
  };

  // Generate days for the selected week range
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

  useEffect(() => {
    if (weekData.length > 0) {
      weeklyList(weekData); // Pass updated weekData to parent when it changes
    }
  }, [weekData, weeklyList]);

  useEffect(() => {
    handleSelectedMonth(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

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

  return (
    <div className="pb-4 pe-3">
      <h4 className="textheader heading mt-2">Weekly Timesheet</h4>
      <div className="flex">
        {/* Week Range Dropdown */}
        <FormControl sx={{ width: "fit-content" }}>
          <Select
            value={dropdownRange}
            onChange={handleRangeChange}
            displayEmpty
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

          // Highlight only the selected date
          const isSelectedDate =
            format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          return (
            <Cell
              key={index}
              isActive={isSelectedDate}
              className={`relative rounded para2 textheader ${
                isSelectedDate ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleDateClick(date)}
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
