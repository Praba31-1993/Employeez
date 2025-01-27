"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faFileCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Outlinebutton from "@/app/reusableComponent/outlinebtn";
import Uploadfiles from "./uploadfiles";
import { useState } from "react";
import Summarydetails from "./summarydetails";
import { Colors } from "@/app/reusableComponent/styles";
import { Addprojectpopup } from "./addprojectpopup";
import { Idetails } from "./idetail";
import { customsheet } from "@/app/reusableComponent/JsonData";
import { AssinedProjectlist } from "@/app/reusableComponent/JsonData";
import { TimesheetExpenceAndHoursField } from "@/app/reusableComponent/timesheetexpenceandhoursfield";

export default function Timesheetcalendar({
  timesheetList,
  calendardatas,
  weekListDatas,
}: any) {
  const useColors = Colors();

  const [open, setOpen] = useState(false);
  const [getAllProjectLists, setallProjectLists] = useState<any>();
  const [selectedProjected, setSelectedProjected] = useState<any>(0); // Accepts string values
  const [unSelectedProjectedData, setshowUnSelectedProjectedData] =
    useState<any>();

  const [addproject, openproject] = useState(false);
  const [openpopups, openPopUp] = useState(false);
  const [openidealpopups, openidealPopUp] = useState(false);
  const lastIndex = weekListDatas?.length - 1;

  const GetData = (data: any) => {
    setallProjectLists(data);
  };

  const openideatail = () => {
    openidealPopUp((prev) => !prev);
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(e.target.value, 10); // Parse the selected value as a number
    setSelectedProjected(selectedIndex); // Update the state with the selected index

    // Fetch selected project data
    const selectedProject = AssinedProjectlist[selectedIndex];

    if (selectedProject) {
      // Update the selected project name

      // Filter out the unselected projects
      const unSelectedData = AssinedProjectlist.filter(
        (list: any) => list.projectid !== selectedProject.projectid
      );

      setshowUnSelectedProjectedData(unSelectedData);
    }
  };

  return (
    <>
      {open && <Uploadfiles show={open} close={() => setOpen(false)} />}
      {openpopups && (
        <Summarydetails
          showpop={openpopups}
          close={() => openPopUp(false)}
          LeaveTypes={timesheetList[0]}
        />
      )}
      {openidealpopups && (
        <Idetails
          show={openidealpopups}
          close={() => openidealPopUp(false)}
          customsheetlist={customsheet}
        />
      )}
      {addproject && (
        <Addprojectpopup
          show={addproject}
          close={() => openproject(false)}
          projectLists={GetData}
          unSelectedProjectedData={unSelectedProjectedData}
        />
      )}
      <div className="  d-flex align-items-center justify-content-between mt-3">
        <div className="">
          <div className="currentweek d-flex align-items-center">
            <h5 className="heading me-3 textheader mb-0">
              {weekListDatas.length > 0 ? (
                <>
                  {weekListDatas[0]?.monthDay.slice(-2)}-
                  {weekListDatas[lastIndex]?.monthDay.slice(-2)}{" "}
                  {weekListDatas[0]?.month} {weekListDatas[0]?.year}
                </>
              ) : (
                <>01-07 November 2024</>
              )}
            </h5>
            {/* <div className="approvestatus px-3 py-1 para">Approved</div> */}
          </div>
        </div>
        <div className=" d-flex align-items-center justify-content-end">
          <div
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => openPopUp((prev) => !prev)}
          >
            <FontAwesomeIcon
              icon={faFileCircleExclamation}
              style={{ color: useColors.themeRed }}
            />
            <h2 className="para ms-2 d-sm-block d-none mb-0 shade">
              Annual leave summary
            </h2>
          </div>
          {/* Annula leave summary */}
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="ms-sm-4 px-3 py-1"
          >
            <button
              className="outlinebtn ms-sm-4 px-3 py-1"
              style={{
                color: useColors.themeRed,
                border: `1px solid ${useColors.themeRed}`,
              }}
            >
              Upload <FontAwesomeIcon className="ms-2" icon={faCirclePlus} />
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-12">
          <div className="d-flex px-3 justify-content-between">
            <div
              className="d-flex w-lg-100 justify-content-between"
              style={{ width: "85%" }}
            >
              {weekListDatas?.map((weeklist: any, index: number) => (
                <div key={index}>
                  <p className="para2 mb-1  textheader text-center">
                    {weeklist?.monthDay} ({weeklist?.day})
                  </p>
                </div>
              ))}
            </div>
            <div style={{ width: "15%" }}>
              <p
                className="para2 mb-1 ms-2 text-center"
                style={{ color: useColors.themeRed }}
              >
                Week Total
              </p>
            </div>
          </div>

          {timesheetList[2]?.map((timesheet: any, index: number) => (
            <div key={index}>
              <TimesheetExpenceAndHoursField
                text={timesheet?.codeLabel}
                timesheetData={timesheetList}
                weekListDataList={weekListDatas}
                calendardatas={calendardatas}
              />
            </div>
          ))}
        </div>
        <div className="col-12 d-flex  justify-content-end mt-4">
          <div className="ms-3"></div>
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
              disabled={true}
              variant={"outlined"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
