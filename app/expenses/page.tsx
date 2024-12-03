// 'use client';

// import "../timesheet/timesheet.css";
// import React, { useState, useEffect } from "react";
// import Summarydetails from "../timesheet/summarydetails";
// import Listofholidays, { Timesheetaproover } from "../timesheet/listofholidays";
// import Sidebar from "../sidebar/page";
// import Uploadfiles, { Viewfiles } from "../timesheet/uploadfiles";

// import { Totalsummary, Totalsummarycards } from "../timesheet/totalsummarydetails";
// import Summaryheetcalendar from "./expensecsheetcalendar";
// import { Expensestotalsummary } from "./expensesaprroverandtotal";
// import MonthlyCalendar from "../reusableComponent/calendar/monthlyCalendar";

// export default function Expenses() {
//      // State to toggle visibility of components
//      const [showSummaryCards, setShowSummaryCards] = useState(false);

//      useEffect(() => {
//          // Add the dashboard background className when the component mounts
//          document.body.classList.add("dashboard-body");
//          // Clean up the effect to remove the className when the component unmounts
//          return () => {
//              document.body.classList.remove("dashboard-body");
//          };
//      }, []);

//   return (
//     <>
//     <Sidebar>
//         <section className="timesheet">
//             <div className="container-fluid px-0 mb-3">
//                 <div className="row">
//                     <div className="col-12 pt-3 pb-0">
//                         <h2 className="heading textheader mb-0">Expenses</h2>
//                     </div>
//                     <div className="col-lg-4 col-xxl-3 borderright">
//                         <div className="row">
//                             <div className="col-lg-12 px-0 col-sm-6">
//                                 <div className="calendar">
//                                     {/* <MonthlyCalendar/> */}
//                                     {/* <SemiMonthlyCalendar /> */}
//                                     {/* <SemiWeeklyCalendar /> */}
//                                     {/* <WeeklyCalendar /> */}
//                                 </div>
//                                 {/* Pass the toggle function to Totalsummary */}
//                                 <Expensestotalsummary
//                                     showsummarycards={() =>
//                                         setShowSummaryCards(!showSummaryCards)
//                                     }
//                                 />
//                                 <Summarydetails />
//                             </div>
//                             <div className="col-lg-12 col-sm-6">
//                                  <Timesheetaproover /> 
//                                 <Viewfiles />
//                             </div>
//                         </div>
//                     </div>
//                     {/* timesheet */}
//                     <div className="col-xxl-9 col-lg-8 col-md-12">
//                         {/* Conditionally render components */}
//                         {showSummaryCards ? <Totalsummarycards /> : <Summaryheetcalendar />}
//                     </div>
//                 </div>
//             </div>
//             <Uploadfiles />
//         </section>
//     </Sidebar>
// </>
//   );
// }
