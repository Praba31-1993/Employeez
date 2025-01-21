"use client";
import "./timesheet.css";
import React, { useEffect, useState } from "react";
import Listofholidays, { Timesheetaproover } from "./components/listofholidays";
import Timesheetcalendar from "./components/timesheetscalendar";
import {
  Totalsummary,
  Totalsummarycards,
} from "./components/totalsummarydetails";
import Uploadfiles, { Viewfiles } from "./components/uploadfiles";
import { loginResponse } from "../reusableComponent/JsonData";
import MonthlyCalendar from "../reusableComponent/calendar/monthlyCalendar";
import WeeklyCalendar from "../reusableComponent/calendar/weeklycalendar";
import SemiMonthlyCalendar from "../reusableComponent/calendar/semimonthlyCalendar";
import BiWeeklyCalendar from "../reusableComponent/calendar/biweeklycalendar";
import { TimesheetDataByMonth } from "../reusableComponent/JsonData";
import moment from "moment";
import { holidayList, vacationList } from "../reusableComponent/JsonData";
import Sidebar from "../sidebar/page";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Timesheet() {
  const [showSummaryCards, setShowSummaryCards] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timesheetList, setTimeSheetList] = useState<any>(TimesheetDataByMonth);
  const [getWeeklyList, setgetWeeklyList] = useState<Array<any>>([]);
  const [holidayPerMonth, setHolidayPerMonth] = useState<Array<any>>([]);
  const [vacationPerMonth, setVacationPerMonth] = useState<Array<any>>([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const loginDatas: any = useSelector((state: RootState) => state.login.user);

  const timesheetDataConvertedToFetchCalendar = timesheetList.flat();

  // Filter for objects with codeId and codeLabel (relevant data)
  const codeItems = timesheetDataConvertedToFetchCalendar?.filter(
    (item: any) => item.codeId && item.codeLabel
  );
  const timesheetItems = timesheetDataConvertedToFetchCalendar?.filter(
    (item: any) => item.codeId && item.day
  );

  // Merge data by matching codeId
  const ConvertedTimeSheetForCalendar = timesheetItems?.map(
    (timesheetItem: any) => {
      const code = codeItems?.find(
        (codeItem: any) => codeItem.codeId === timesheetItem.codeId
      );
      return {
        ...timesheetItem,
        codeLabel: code ? code.codeLabel : "",
      };
    }
  );

  // To dispaly which week need to display in the UI
  const handleWeekList = (weeklistData: any) => {
    console.log("weeklistDate", weeklistData);

    setgetWeeklyList(weeklistData);
  };

  // display holiday and vacation in the UI for the selected Month
  const handleHolidayandVacationList = (month: any, year: any) => {
    console.log("month", typeof month, typeof year);

    const holidayresult = holidayList.filter(
      (list) => list.month === month && list.year === year.toString()
    );
    setHolidayPerMonth(holidayresult);

    const vacationresult = vacationList.filter(
      (list) => list.month === month && list.year === year.toString()
    );
    setVacationPerMonth(vacationresult);
  };

  const handleSelectedMonth = (month: any, year: any) => {
    let convertedMonth = moment(month + 1, "M").format("MMMM");
    setSelectedMonth(convertedMonth);
    setSelectedYear(year);
  };

  useEffect(() => {
    handleHolidayandVacationList(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  console.log("currentDate", currentDate);

  return (
    <>
      <Sidebar>
        <section className="timesheet">
          <div className="container-fluid px-0  mb-3">
            <div className="row">
              <div className="col-12 pt-3 pb-0">
                <h2 className="heading textheader mb-0">Timesheet</h2>
              </div>
              <div className="col-lg-4 col-xxl-3 borderright">
                <div className="row px-0">
                  <div className="col-lg-12 px-0 col-sm-6">
                    {loginDatas === null ? (
                      <div className="calendar">
                        {/* <MonthlyCalendar
                          value={currentDate}
                          onChange={setCurrentDate}
                          calendardatas={ConvertedTimeSheetForCalendar}
                          weeklyList={handleWeekList}
                          handleSelectedMonth={handleSelectedMonth}
                        /> */}
                         <BiWeeklyCalendar
                            value={currentDate}
                            onChange={setCurrentDate}
                            calendardatas={ConvertedTimeSheetForCalendar}
                            weeklyList={handleWeekList}
                            handleSelectedMonth={handleSelectedMonth}
                          />
                      </div>
                    ) : (
                      <div className="calendar">
                        {loginDatas?.userInfo?.paySchedule === "Monthly" ? (
                          <MonthlyCalendar
                            value={currentDate}
                            onChange={setCurrentDate}
                            calendardatas={ConvertedTimeSheetForCalendar}
                            weeklyList={handleWeekList}
                            handleSelectedMonth={handleSelectedMonth}
                          />
                        ) : loginDatas?.userInfo?.paySchedule === "Weekly" ? (
                          <WeeklyCalendar
                            value={currentDate}
                            onChange={setCurrentDate}
                            calendardatas={ConvertedTimeSheetForCalendar}
                            weeklyList={handleWeekList}
                            handleSelectedMonth={handleSelectedMonth}
                          />
                        ) : loginDatas?.userInfo?.paySchedule ===
                          "Bi-Weekly" ? (
                          <BiWeeklyCalendar
                            value={currentDate}
                            onChange={setCurrentDate}
                            calendardatas={ConvertedTimeSheetForCalendar}
                            weeklyList={handleWeekList}
                            handleSelectedMonth={handleSelectedMonth}
                          />
                        ) : loginDatas?.userInfo?.paySchedule ===
                          "Semi-Monthly" ? (
                          <SemiMonthlyCalendar
                            value={currentDate}
                            onChange={setCurrentDate}
                            calendardatas={ConvertedTimeSheetForCalendar}
                            weeklyList={handleWeekList}
                            handleSelectedMonth={handleSelectedMonth}
                          />
                        ) : null}
                      </div>
                    )}
                    {/* Pass the toggle function to Totalsummary */}
                    <Totalsummary
                      showsummarycards={() =>
                        setShowSummaryCards(!showSummaryCards)
                      }
                    />
                    {/* <Summarydetails /> */}
                  </div>
                  <div className="col-lg-12 col-sm-6 d-lg-block d-none">
                    <Timesheetaproover />
                    <Listofholidays
                      holidayPerMonth={holidayPerMonth}
                      vacationPerMonth={vacationPerMonth}
                    />
                    <Viewfiles />
                  </div>
                </div>
              </div>
              {/* timesheet */}
              <div className="col-xxl-9 col-lg-8 col-md-12">
                {/* Conditionally render components */}
                {showSummaryCards ? (
                  <Totalsummarycards />
                ) : (
                  <Timesheetcalendar
                    timesheetList={timesheetList}
                    calendardatas={ConvertedTimeSheetForCalendar}
                    weekListDatas={getWeeklyList}
                  />
                )}
              </div>
              <div className="col-12  d-block d-lg-none">
                <Timesheetaproover />
                <Listofholidays
                  holidayPerMonth={holidayPerMonth}
                  vacationPerMonth={vacationPerMonth}
                />
                <Viewfiles />
              </div>
            </div>
          </div>
          <Uploadfiles />
        </section>
      </Sidebar>
    </>
  );
}
