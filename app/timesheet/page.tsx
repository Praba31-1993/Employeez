"use client";
import "./timesheet.css";
import React, { useState} from "react";
import Listofholidays, { Timesheetaproover } from "./components/listofholidays";
import Timesheetcalendar from "./components/timesheetscalendar";
import Sidebar from "../sidebar/page";
import { Totalsummary, Totalsummarycards } from "./components/totalsummarydetails";
import Uploadfiles, { Viewfiles } from "./components/uploadfiles";
import { loginResponse } from "../reusableComponent/JsonData";
import MonthlyCalendar from "../reusableComponent/calendar/monthlyCalendar";
import WeeklyCalendar from "../reusableComponent/calendar/weeklycalendar";
import SemiMonthlyCalendar from "../reusableComponent/calendar/semimonthlyCalendar";
import BiWeeklyCalendar from "../reusableComponent/calendar/biweeklycalendar";
import { TimesheetDataByMonth } from "../reusableComponent/JsonData";

export default function Timesheet() {
  const [showSummaryCards, setShowSummaryCards] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timesheetList, setTimeSheetList] = useState<any>(TimesheetDataByMonth);
  const [getWeeklyList, setgetWeeklyList] = useState<Array<any>>([]);
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

  const handleWeekList = (weeklistData: any) => {
    setgetWeeklyList(weeklistData);
  };

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
                    <div className="calendar">
                      {loginResponse[0].userInfo?.paySchedule === "Monthly" ? (
                        <MonthlyCalendar
                          value={currentDate}
                          onChange={setCurrentDate}
                          calendardatas={ConvertedTimeSheetForCalendar}
                          weeklyList={handleWeekList}
                        />
                      ) : loginResponse[0].userInfo?.paySchedule ===
                        "Weekly" ? (
                        // <WeeklyCalendar />
                        <WeeklyCalendar
                          value={currentDate}
                          onChange={setCurrentDate}
                        />
                      ) : loginResponse[0].userInfo?.paySchedule ===
                        "Bi-Weekly" ? (
                        <BiWeeklyCalendar
                          value={currentDate}
                          onChange={setCurrentDate}
                        />
                      ) : loginResponse[0].userInfo?.paySchedule ===
                        "Semi-Monthly" ? (
                        <SemiMonthlyCalendar
                          value={currentDate}
                          onChange={setCurrentDate}
                        />
                      ) : null}
                    </div>
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
                    <Listofholidays />
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
                    <Listofholidays />
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
