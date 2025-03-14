"use Client"
import { Colors } from "@/app/reusableComponent/styles";
import Summary from "./summary";
import {
  sampleTimesheetData,
  sampleOverTimeData,
  sampleSummaryView,
} from "@/app/reusableComponent/JsonData";

export function Totalsummary({ showsummarycards }: any) {
  return (
    <div onClick={showsummarycards} className="px-3">
      <div
        className="d-flex pt-2 align-items-center"
        // onClick={showsummarycards}
        style={{ cursor: "pointer" }}
      >
        <div
          className="round mr-2"
          style={{ backgroundColor: "#14E002" }}
        ></div>
        <p className="para mb-0 unselectcolor">
          Total regular (Billable) hrs: 05
        </p>
      </div>
      <div
        className="d-flex pt-2 align-items-center"
        style={{ cursor: "pointer" }}
      >
        <div className="round mr-2"></div>
        <p className="para mb-0 unselectcolor">Total hrs (Summary view): 05</p>
      </div>
    </div>
  );
}
export function Totalsummarycards() {
  const useColors = Colors();
 
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-end">
            <div>
              <h5 className="heading me-3 textheader mb-0">
                Summary for period
              </h5>
              <div className="d-flex pt-1 align-items-center">
                <div
                  className="round  mr-2"
                  style={{ background: useColors.themeRed }}
                ></div>
                <p className="para mb-0 unselectcolor">
                  Click on the timesheet type to highlight the corresponding
                  days4
                </p>
              </div>
            </div>
            <h5 className="para me-3 textheader mb-0">01-07 November 2024</h5>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <Summary
          timesheetData={sampleTimesheetData} // Your timesheet data
          timesheetSummaryViewVM={sampleSummaryView} // Your summary view data
          saveOrSubmitDates={{ startDate: "2024-11-01", endDate: "2024-11-30" }}
          overTimeData={sampleOverTimeData}
          empPayOverTimeData={sampleOverTimeData}
          currentUser={{ Role: "TC" }}
          recordComments="No issues with overtime"
        />
      </div>
    </>
  );
}
