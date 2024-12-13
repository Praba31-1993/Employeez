import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faFileCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Outlinebutton from "../reusableComponent/outlinebtn";
import Uploadfiles from "../timesheet/uploadfiles";
import { useState } from "react";
import Summarydetails from "../timesheet/summarydetails";
import { Colors } from "../reusableComponent/styles";

export default function Summaryheetcalendar() {
  const useColors = Colors();
  const [open, setOpen] = useState(false);
  const [openpopups, setopenPopUp] = useState(false);

  const Expenseslist = [
    { id: 1, expenses: "Car rental" },
    { id: 2, expenses: "Client visit" },
    { id: 3, expenses: "Gas" },
    { id: 4, expenses: "Meals" },
    { id: 5, expenses: "Parking" },
    { id: 6, expenses: "Airfare" },
    { id: 7, expenses: "Toll" },
    { id: 8, expenses: "Phone" },
  ];

  return (
    <>
      {open && <Uploadfiles show={open} close={() => setOpen(false)} />}
      {openpopups && (
        <Summarydetails showpop={openpopups} close={() => setopenPopUp(false)} />
      )}

      <div className="  d-flex align-items-center justify-content-between mt-3">
        <div className="">
          <div className="currentweek d-flex align-items-center">
            <h5 className="heading me-3 textheader mb-0">
              01-07 November 2024
            </h5>
            <div className="approvestatus px-3 py-1 para">Approved</div>
          </div>
        </div>
        <div className=" d-flex align-items-center justify-content-end">
          {/* <div className="d-flex align-items-center" style={{ cursor: "pointer", }} onClick={() => openPopUp(prev => !prev)} >
                        <FontAwesomeIcon icon={faFileCircleExclamation} style={{ color: useColors.themeRed }} />
                        <h2 className="para ms-2 mb-0 shade">Annual leave summary</h2>
                    </div> */}
          <button
            className="outlinebtn ms-4 px-3 py-1"
            style={{
              color: useColors.themeRed,
              border: `1px solid ${useColors.themeRed}`,
            }}
            onClick={() => setOpen((prev) => !prev)}
          >
            Upload <FontAwesomeIcon className="ms-2" icon={faCirclePlus} />
          </button>
        </div>
      </div>
      <div className="row mt-2">
        {/* <div className="col-12">
                {
                    Expenseslist.map((expenses, index) => (
                        
                            <Timesheetexpenceandhoursfield key={index}  text={expenses.expenses} />
                    ))
                   
                }
                </div> */}
        <div className="col-12 d-flex  justify-content-end mt-4">
          <div className="ms-3">
            <Outlinebutton
              color={useColors.themeRed}
              border={`1px solid ${useColors.themeRed}`}
              text="Save"
              fontSize="12px"
              background="transparent"
              variant={"outlined"}

            />
          </div>
          <div className="ms-3">
            <Outlinebutton
              color="#FFF"
              border={`1px solid ${useColors.themeRed}`}
              text="Submit"
              fontSize="12px"
              background={useColors.themeRed}
              variant={"outlined"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
