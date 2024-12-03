import calendar from "../assets/img/calendar_icon.png";
import carry from "../assets/img/carry_on_bag_icon.png";
import gift from "../assets/img/gift_icon.png";
import user from "../assets/img/Ellipse 14.svg";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import Summarydetails from "./summarydetails";
import { useState } from "react";
import { Colors } from "../reusableComponent/styles";

export default function Listofholidays() {
  const useColors = Colors();
  return (
    <>
      <div className="col-lg-12 col-sm-6">
        {/* timesheet approver */}

        {/* list of holidays */}
        <div className="timesheetdetails mb-1 align-items-center d-flex mt-4">
          <Image src={gift} alt={""} />
          <p className="para ps-2 mb-0 unselectcolor">List of holidays</p>
        </div>
        <div className="d-flex pt-1 align-items-center">
          <div
            className="round  mr-2"
            style={{ background: useColors.themeRed }}
          ></div>
          <p className="para mb-0 textheader">Diwali 31 Oct 2024</p>
        </div>
        <div className="d-flex pt-1 align-items-center">
          <div
            className="round mr-2"
            style={{ background: useColors.themeRed }}
          ></div>
          <p className="para mb-0 textheader">Extended 01 Nov 2024</p>
        </div>
        {/* vacation */}
        <div className="timesheetdetails mb-1 align-items-center d-flex mt-4">
          <Image src={carry} alt={""} />
          <p className="para ps-2 mb-0 unselectcolor">Vacations</p>
        </div>
        <div className="d-flex pt-1 align-items-center">
          <div className="vacantionround mr-2"></div>
          <p className="para mb-0 textheader">23 Oct 2024</p>
        </div>
        <div className="d-flex pt-1 align-items-center">
          <div className="vacantionround mr-2"></div>
          <p className="para mb-0 textheader">26 Dec 2024 to 27 Dec 2024</p>
        </div>
      </div>
    </>
  );
}

export function Timesheetaproover() {
  return (
    <>
      <div className="timesheetdetails  align-items-center d-flex mt-4">
        <Image src={calendar} alt={""} />
        <p className="para ps-2 mb-0 unselectcolor">Timesheet approver</p>
      </div>
      <div className="approverlist  align-items-center d-flex mt-2">
        <div style={{ width: "35px", height: "35px" }}>
          <Image className="w-100 h-100" src={user} alt={""} />
        </div>

        {/* <Avatar src='' /> */}
        <div className="roles">
          <h5 className="para ps-2 mb-0 ">Timesheet approver</h5>
          <p className="para2 ps-2 mb-0 mt-1 shade">Timesheet approver</p>
        </div>
      </div>
    </>
  );
}
