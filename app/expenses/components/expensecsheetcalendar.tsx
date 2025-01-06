"use client"
import { Colors } from "@/app/reusableComponent/styles";
import { useState } from "react";
import Uploadfiles from "@/app/timesheet/components/uploadfiles";
import Summarydetails from "@/app/timesheet/components/summarydetails";
import Outlinebutton from "@/app/reusableComponent/outlinebtn";

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
        <Summarydetails
          showpop={openpopups}
          close={() => setopenPopUp(false)}
        />
      )}

      <div className="row mt-2">
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
