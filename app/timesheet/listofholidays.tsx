import { Colors } from "../reusableComponent/styles";
import ImageComponent from "../reusableComponent/image";

export default function Listofholidays() {
  const useColors = Colors();
  return (
    <>
      <div className="col-lg-12 col-sm-6">
        {/* timesheet approver */}

        {/* list of holidays */}
        <div className="timesheetdetails mb-1 align-items-center d-flex mt-4">
          {/* <Image src={gift} alt={""} /> */}
          <ImageComponent width={24}  height={24} user={"/assets/img/gift_icon.png"} />
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
          {/* <Image src={carry} alt={""} /> */}
          <ImageComponent width={24}  height={24} user={"/assets/img/carry_on_bag_icon.png"} />

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
        {/* <Image src={calendar} alt={""} /> */}
        <ImageComponent width={20}  height={20} user={"/assets/img/calendar_icon.png"} />

        <p className="para ps-2 mb-0 unselectcolor">Timesheet approver</p>
      </div>
      <div className="approverlist  align-items-center d-flex mt-2">
        <div style={{ width: "35px", height: "35px" }}>
          {/* <Image className="w-100 h-100" src={user} alt={""} /> */}
          <div className="w-100 h-100">
            <ImageComponent width={30}  height={30} user={"/assets/img/Ellipse 14.svg"} />
          </div>
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
