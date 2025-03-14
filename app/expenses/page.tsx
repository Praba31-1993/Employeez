"use client";

import "../timesheet/timesheet.css";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../reusableComponent/styles";
import Sidebar from "../sidebar/page";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TimesheetDataByMonth } from "../reusableComponent/JsonData";

// ⏬ Dynamic Imports (SSR Disabled)
const Summarydetails = dynamic(() => import("../timesheet/components/summarydetails"), { ssr: false });
const Timesheetaproover = dynamic(() => import("../timesheet/components/listofholidays").then(mod => mod.Timesheetaproover), { ssr: false });
const Uploadfiles = dynamic(() => import("../timesheet/components/uploadfiles"), { ssr: false });
const Viewfiles = dynamic(() => import("../timesheet/components/uploadfiles").then(mod => mod.Viewfiles), { ssr: false });
const Totalsummarycards = dynamic(() => import("../timesheet/components/totalsummarydetails").then(mod => mod.Totalsummarycards), { ssr: false });
const Summaryheetcalendar = dynamic(() => import("./components/expensecsheetcalendar"), { ssr: false });
const Expensestotalsummary = dynamic(() => import("./components/expensesaprroverandtotal").then(mod => mod.Expensestotalsummary), { ssr: false });
const TimesheetExpenceAndHoursField = dynamic(() => import("../reusableComponent/timesheetexpenceandhoursfield").then(mod => mod.TimesheetExpenceAndHoursField), { ssr: false });

// Dynamic Calendar Imports
const MonthlyCalendar = dynamic(() => import("../reusableComponent/calendar/monthlyCalendar"), { ssr: false });
const WeeklyCalendar = dynamic(() => import("../reusableComponent/calendar/weeklycalendar"), { ssr: false });
const SemiMonthlyCalendar = dynamic(() => import("../reusableComponent/calendar/semimonthlyCalendar"), { ssr: false });
const BiWeeklyCalendar = dynamic(() => import("../reusableComponent/calendar/biweeklycalendar"), { ssr: false });

export default function Expenses({ weekListDatas }: any) {
  const useColors = Colors();
  const [showSummaryCards, setShowSummaryCards] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timesheetList, setTimeSheetList] = useState<any>(TimesheetDataByMonth);
  const [getWeeklyList, setgetWeeklyList] = useState<Array<any>>([]);
  const [open, setOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const loginDatas: any = useSelector((state: RootState) => state.login.user);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("Role"));
    }
  }, []);

  const timesheetDataConvertedToFetchCalendar = timesheetList.flat();

  // Filter for objects with codeId and codeLabel
  const codeItems = timesheetDataConvertedToFetchCalendar?.filter((item: any) => item.codeId && item.codeLabel);
  const timesheetItems = timesheetDataConvertedToFetchCalendar?.filter((item: any) => item.codeId && item.day);

  // Merge data by matching codeId
  const ConvertedTimeSheetForCalendar = timesheetItems?.map((timesheetItem: any) => {
    const code = codeItems?.find((codeItem: any) => codeItem.codeId === timesheetItem.codeId);
    return {
      ...timesheetItem,
      codeLabel: code ? code.codeLabel : "",
    };
  });

  const handleWeekList = (weeklistData: any) => {
    setgetWeeklyList(weeklistData);
  };

  useEffect(() => {
    document.body.classList.add("dashboard-body");
    return () => {
      document.body.classList.remove("dashboard-body");
    };
  }, []);

  const handleSelectedMonth = (month: any, year: any) => {
    let convertedMonth = moment(month + 1, "M").format("MMMM");
    setSelectedMonth(convertedMonth);
    setSelectedYear(year);
  };

  return (
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
                    ) : loginDatas?.userInfo?.paySchedule === "Bi-Weekly" ? (
                      <BiWeeklyCalendar
                        value={currentDate}
                        onChange={setCurrentDate}
                        calendardatas={ConvertedTimeSheetForCalendar}
                        weeklyList={handleWeekList}
                        handleSelectedMonth={handleSelectedMonth}
                      />
                    ) : loginDatas?.userInfo?.paySchedule === "Semi-Monthly" ? (
                      <SemiMonthlyCalendar
                        value={currentDate}
                        onChange={setCurrentDate}
                        calendardatas={ConvertedTimeSheetForCalendar}
                        weeklyList={handleWeekList}
                        handleSelectedMonth={handleSelectedMonth}
                      />
                    ) : null}
                  </div>
                  <Expensestotalsummary showsummarycards={() => setShowSummaryCards(!showSummaryCards)} />
                  <Summarydetails />
                </div>
                <div className="col-lg-12 col-sm-6">
                  <Timesheetaproover />
                  <Viewfiles />
                </div>
              </div>
            </div>

            <div className="col-xxl-9 col-lg-8 col-md-12">
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div className="currentweek d-flex align-items-center">
                  <h5 className="heading me-3 textheader mb-0">01-07 November 2024</h5>
                  <div className="approvestatus px-3 py-1 para">Approved</div>
                </div>
                <button
                  className="outlinebtn ms-4 px-3 py-1"
                  style={{ color: useColors.themeRed, border: `1px solid ${useColors.themeRed}` }}
                  onClick={() => setOpen((prev) => !prev)}
                >
                  Upload <FontAwesomeIcon className="ms-2" icon={faCirclePlus} />
                </button>
              </div>

              <div className="d-flex px-3 justify-content-between">
                <div className="d-flex justify-content-between" style={{ width: "80%" }}>
                  {weekListDatas?.map((weeklist: any, index: number) => (
                    <div key={index}>
                      <p className="para2 mb-1 textheader text-center">
                        {weeklist?.monthDay} {weeklist?.day}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {timesheetList[2]?.map((timesheet: any, index: number) => (
                <TimesheetExpenceAndHoursField key={index} text={timesheet?.codeLabel} timesheetData={timesheetList} />
              ))}

              {showSummaryCards ? <Totalsummarycards /> : <Summaryheetcalendar />}
            </div>
          </div>
        </div>
        <Uploadfiles />
      </section>
    </Sidebar>
  );
}
