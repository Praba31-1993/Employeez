import * as React from "react";
import Outlinebutton from "@/app/reusableComponent/outlinebtn";
import Menulistitem from "@/app/reusableComponent/menulist";
import { Colors } from "@/app/reusableComponent/styles";
import usedholiday from "@/app/assets/img/usedholidays.svg";
import totalholidays from "@/app/assets/img/totalholidays.svg";
import balanceholidays from "@/app/assets/img/balanceholidays.svg";
import balancecl from "@/app/assets/img/balancecl.svg";
import balancesl from "@/app/assets/img/balancesl.svg";
import contact from "@/app/assets/img/contact.svg";
import Image from "next/image";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import arrowIcon from "@/app/assets/img/arrowicon.svg";
import Timer from "@/app/reusableComponent/timer";
import downarrowcircle from "@/app/assets/img/downarrrowCircle.svg"

export default function ProfilesCard() {
  const useColors = Colors();
  const [punchIn, setPunchIn] = React.useState<Boolean>(false);
  const [totalTime, setTotalTime] = React.useState<string>('');


  const arrayList = [
    { holidaysname: "Total Holiday", noofholidays: "32", img: totalholidays },
    { holidaysname: "Used Holiday", noofholidays: "11", img: usedholiday },
    {
      holidaysname: "Balance Holiday",
      noofholidays: "12",
      img: balanceholidays,
    },
    { holidaysname: "Balance CL", noofholidays: "12", img: balancecl },
    { holidaysname: "Balance SL", noofholidays: "08", img: balancesl },
    { holidaysname: "Important contact", noofholidays: "20", img: contact },
  ];
  console.log('timesTotal', totalTime);
  

  return (
    <>
      <div className="flex justify-content-between pb-2">
        <Menulistitem />
        <div className="d-flex align-items-center pe-5">
          <p
            className="mb-0 cursorPointer para pe-3"
            style={{ color: useColors.themeRed }}
          >
            Supervisee
          </p>
          <div onClick={() => setPunchIn((prev)=>!prev)}>
            <Outlinebutton
              color={useColors.white}
              border={`1px solid ${useColors.themeRed}`}
              text={punchIn?"Punch out" : "Punch in"}
              fontSize="12px"
              background={useColors.themeRed}
              isDashboardIcon={true}
              disabled={false}
              icon={punchIn? downarrowcircle :arrowIcon}
              variant={"contained"}
            />
          </div>
          {punchIn && <Timer starttime={punchIn} timevalue={(data:any)=>setTotalTime(data)}/>}
        </div>
      </div>
      <div className="d-flex pt-2  pe-2 justify-content-lg-between justify-content-xxl-start gap-xxl-5 gap-3 flex-wrap">
        {arrayList?.map((list: any, index: number) => {
          const isLastChild = index === arrayList.length - 1;

          return (
            <div key={index} className="d-flex my-2 flex-column ">
              <div className="d-flex gap-2 align-items-center">
                <Image src={list.img} alt="" />
                <h6 className="mb-0 textheader heading2">
                  {list.noofholidays}
                </h6>
              </div>
              <p
                className="para pt-2 text-center mb-0 shade"
                style={{ color: isLastChild ? useColors.themeRed : undefined }}
              >
                {list.holidaysname}{" "}
                {isLastChild && (
                  <span>
                    <VisibilityOutlinedIcon className="ps-1 cursorPointer" />
                  </span>
                )}{" "}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
