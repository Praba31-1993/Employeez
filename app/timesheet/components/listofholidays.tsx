"use client";
import Image from "next/image";
import ImageComponent from "@/app/reusableComponent/image";
import user from "@/public/assets/img/Ellipse 14.svg";
import { Colors } from "@/app/reusableComponent/styles";
import moment from "moment";

export default function Listofholidays({
  holidayPerMonth,
  vacationPerMonth,
}: any) {
  const useColors = Colors();
  return (
    <>
      <div className="col-lg-12 col-sm-6">
        {/* timesheet approver */}

        {/* list of holidays */}
        <div className=" mb-1 align-items-center d-flex mt-4">
          {/* <Image src={gift} alt={""} /> */}
          <ImageComponent
            width={24}
            height={24}
            user={"/assets/img/gift_icon.png"}
          />
          <p className="para ps-2 mb-0 unselectcolor">List of holidays</p>
        </div>
        {holidayPerMonth?.map((holiday: any) => (
          <div key={holiday?.id}>
            <div className="d-flex pt-1 align-items-center">
              <div
                className="round mr-2"
                style={{ background: useColors.themeRed }}
              ></div>
              <span className="para mb-0 textheader">{holiday?.festival}</span>
              <span className="ml-3 para textheader">
                {moment(holiday?.day, "DD-MM-YYYY").format("D MMM YYYY")}
              </span>
            </div>
          </div>
        ))}

        {/* vacation */}
        <div className=" mb-1 align-items-center d-flex mt-4">
          {/* <Image src={carry} alt={""} /> */}
          <ImageComponent
            width={24}
            height={24}
            user={"/assets/img/carry_on_bag_icon.png"}
          />

          <p className="para ps-2 mb-0 unselectcolor">Vacations</p>
        </div>

        {vacationPerMonth?.map((vacation: any) => (
          <div key={vacation?.id}>
            <div className="d-flex pt-1 align-items-center">
              <div className="vacantionround mr-2"></div>
              <span className="para mb-0 textheader">
                {moment(vacation?.day, "DD-MM-YYYY").format("D MMM YYYY")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function Timesheetaproover() {
  return (
    <>
      <div className="  align-items-center d-flex mt-4">
        {/* <Image src={calendar} alt={""} /> */}
        <ImageComponent
          width={20}
          height={20}
          user={"/assets/img/calendar_icon.png"}
        />

        <p className="para ps-2 mb-0 unselectcolor">Timesheet approver</p>
      </div>
      <div className="approverlist  align-items-center d-flex mt-2">
        <div style={{ width: "35px", height: "35px" }}>
          <Image className="w-100 h-100" src={user} alt={""} />
        </div>

        {/* <Avatar src='' /> */}
        <div className="roles">
          <h5 className="para ps-2 mb-0 ">Gloria mehckilm</h5>
          <p className="para2 ps-2 mb-0 mt-1 shade">Assistant manager</p>
        </div>
      </div>
    </>
  );
}
