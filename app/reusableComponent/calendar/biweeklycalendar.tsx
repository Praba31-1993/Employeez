import {
  add,
  format,
  startOfYear,
  endOfYear,
  startOfWeek,
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
const today = new Date();

type Props = {
  value?: Date;
  onChange: (date: Date) => void;
  weeklyList: (weeklist: any) => void;
  handleSelectedMonth: (month: any, year: any) => void;
  calendardatas: any;
};

const BiWeeklyCalendar: React.FC<Props> = ({
  value = today,
  onChange,
  weeklyList,
  handleSelectedMonth,
  calendardatas,
}) => {
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [clickedDateData, setClickedDateData] = useState<any>(null); // Store clicked date's data

  const [weekData, setWeekData] = useState<
    Array<{ day: string; date: string }>
  >([]);

  const [selectedYear, setSelectedYear] = useState(value.getFullYear());
  const [dropdownRanges, setDropdownRanges] = useState<string[]>([]);
  const [dropdownRange, setDropdownRange] = useState<string>(
    "01/01/2024 - 07/01/2024"
  ); // Default value

  // This effect will update the dropdown ranges when the selected year changes
  useEffect(() => {
    const start = startOfYear(new Date(selectedYear, 0, 1)); // Start of the selected year
    const end = endOfYear(new Date(selectedYear, 0, 1)); // End of the selected year

    let weeksInYear: string[] = [];
    let currentRange = "";
    let currentStart = start;

    // Generate biweekly ranges and find the range containing today's date
    while (currentStart <= end) {
      const currentEnd = add(currentStart, { days: 13 }); // 14-day range
      const weekRange = `${format(currentStart, "dd/MM/yyyy")} - ${format(
        currentEnd,
        "dd/MM/yyyy"
      )}`;
      weeksInYear.push(weekRange);

      if (currentStart <= today && today <= currentEnd) {
        currentRange = weekRange;
      }

      currentStart = add(currentEnd, { days: 1 }); // Move to next biweekly range
    }

    setDropdownRanges(weeksInYear); // Update the dropdown ranges

    // Set the default selected range and date
    if (currentRange) {
      setDropdownRange(currentRange);
      setSelectedDate(today); // Highlight today's date
    }
  }, [selectedYear]);

  // Parse date range correctly
  const parseDateRange = (range: string) => {
    if (!range) return { startDate: new Date(), endDate: new Date() }; // Add a fallback

    const [startDateStr, endDateStr] = range.split(" - ");
    const [startDay, startMonth, startYear] = startDateStr
      .split("/")
      .map(Number);
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
    // setSelectedDate(startDate);
    onChange(startDate); // Trigger the onChange callback
  };

  // handle year
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
      Math.floor(
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      ) + 1;

    const firstDayOfWeek = startDate.getDay();
    const prefixDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    return {
      totalDaysInRange,
      startDate,
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
  // Automatically trigger a "click" on the current date when the component mounts
  useEffect(() => {
    const today = new Date();
    handleDateClick(today);
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className=" pb-4 pe-3">
      <h4 className="textheader heading mt-2">Bi-Weekly Timesheet</h4>
      <div className="flex">
        <FormControl sx={{ width: "fit-content" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dropdownRange} // Bind the value of the Select to the state
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            onChange={handleRangeChange}
            className="textheader para"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove border from the outline
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

        <FormControl sx={{ width: "fit-content" }}>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear.toString()} // Convert number to string for Material-UI compatibility
            onChange={handleYearChange}
            className="textheader para"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove border from the outline
              },
              outline: "none",
            }}
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
          const date = add(startDate, { days: index });

          // Highlight only the selected date or today if initially loading
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

export default BiWeeklyCalendar;
