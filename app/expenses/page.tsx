"use client";

import "../timesheet/timesheet.css";
import React, { useState, useEffect } from "react";
import Summarydetails from "../timesheet/summarydetails";
import Listofholidays, { Timesheetaproover } from "../timesheet/listofholidays";
import Sidebar from "../sidebar/page";
import Uploadfiles, { Viewfiles } from "../timesheet/uploadfiles";

import {
  Totalsummary,
  Totalsummarycards,
} from "../timesheet/totalsummarydetails";
import Summaryheetcalendar from "./expensecsheetcalendar";
import { Expensestotalsummary } from "./expensesaprroverandtotal";
import { loginResponse } from "../reusableComponent/JsonData";
import MonthlyCalendar from "../reusableComponent/calendar/monthlyCalendar";
import WeeklyCalendar from "../reusableComponent/calendar/weeklycalendar";
import SemiMonthlyCalendar from "../reusableComponent/calendar/semimonthlyCalendar";
import BiWeeklyCalendar from "../reusableComponent/calendar/biweeklycalendar";
import { TimesheetDataByMonth } from "../reusableComponent/JsonData";
import { TimesheetExpenceAndHoursField } from "../reusableComponent/timesheetexpenceandhoursfield";
import { Colors } from "../reusableComponent/styles";

export default function Expenses({ weekListDatas,}:any) {
   const useColors = Colors();
  // State to toggle visibility of components
  const [showSummaryCards, setShowSummaryCards] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timesheetList, setTimeSheetList] = useState<any>(TimesheetDataByMonth);
  const [getWeeklyList, setgetWeeklyList] = useState<Array<any>>([]);
  const [isWeeklyListupdated, setIsWeeklyListUpdated] =
    useState<boolean>(false);
    const lastIndex = weekListDatas?.length - 1;
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

  useEffect(() => {
    // Add the dashboard background className when the component mounts
    document.body.classList.add("dashboard-body");
    // Clean up the effect to remove the className when the component unmounts
    return () => {
      document.body.classList.remove("dashboard-body");
    };
  }, []);

  return (
    <>
      <Sidebar>
        <section className="timesheet">
          <div className="container-fluid px-0 mb-3">
            <div className="row">
              <div className="col-12 pt-3 pb-0">
                <h2 className="heading textheader mb-0">Expenses</h2>
              </div>
              <div className="col-lg-4 col-xxl-3 borderright">
                <div className="row">
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
                    <Expensestotalsummary
                      showsummarycards={() =>
                        setShowSummaryCards(!showSummaryCards)
                      }
                    />
                    <Summarydetails />
                  </div>
                  <div className="col-lg-12 col-sm-6">
                    <Timesheetaproover />
                    <Viewfiles />
                  </div>
                </div>
              </div>
              {/* timesheet */}
              <div className="col-xxl-9 col-lg-8 col-md-12">
              <div className="d-flex px-3 justify-content-between">
                        <div className="d-flex justify-content-between" style={{ width: "80%" }}>
                            {weekListDatas?.map((weeklist: any, index: number) => (
                                <div key={index}>
                                    <p className="para2 mb-1 textheader text-center" >
                                        {weeklist?.monthDay} {weeklist?.day}
                                    </p>
                                </div>))}
                        </div>
                        <div style={{ width: "20%" }}>
                            <p className="para2 mb-1 ms-2 text-center" style={{ color: useColors.themeRed }}>
                                Week Total</p>
                        </div>
                    </div>
                {timesheetList[2]?.map((timesheet: any, index: number) => (
                  <div key={index}>
                    <TimesheetExpenceAndHoursField
                      text={timesheet?.codeLabel}
                      timesheetData={timesheetList}
                    />
                  </div>
                ))}
                {/* Conditionally render components */}
                {showSummaryCards ? (
                  <Totalsummarycards />
                ) : (
                  <Summaryheetcalendar />
                )}
              </div>
            </div>
          </div>
          <Uploadfiles />
        </section>
      </Sidebar>
    </>
  );
}
