import training from "../assets/img/model_training.png";
import sick from "../assets/img/sick.png";
import casual from "../assets/img/energy_savings_leaf.png";
import dollar from "../assets/img/dollar.png";
import bag from "../assets/img/carry_on_bag.png";
import maternity from "../assets/img/pregnancy.png";
import paternity from "../assets/img/account_child_invert.png";
import Summarycards from "./summarycards";
import { Colors } from "../reusableComponent/styles";
import Summary from "./summary";
import {
  summaryData,
  sampleTimesheetData,
  sampleOverTimeData,
  sampleSummaryView,
} from "../reusableComponent/JsonData";

export function Totalsummary({ showsummarycards }: any) {
  return (
    <div onClick={showsummarycards}>
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
  const LeaveTypes = [
    { name: "LOP", noOfLeave: "12", img: dollar },
    { name: "Maternity leave", noOfLeave: "23", img: maternity },
    { name: "Sick leave", noOfLeave: "32", img: sick },
    { name: "Comp Off", noOfLeave: "22", img: dollar },
    { name: "Holiday", noOfLeave: "2", img: bag },
    { name: "Traning", noOfLeave: "30", img: training },
    { name: "Earned leave", noOfLeave: "24", img: sick },
    { name: "Paternity leave", noOfLeave: "22", img: paternity },
    { name: "Casual leave", noOfLeave: "80", img: casual },
  ];
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
        {/* {LeaveTypes.map((leave, index) => (
          <div key={index} className="col-lg-3 py-2">
            <Summarycards leaveData={leave} />
          </div>
        ))} */}
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
