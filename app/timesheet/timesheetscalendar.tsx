import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faFileCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Outlinebutton, { IconOutlinebutton } from "../reusableComponent/outlinebtn";
import Uploadfiles from "./uploadfiles";
import { use, useEffect, useState } from "react";
import Summarydetails from "./summarydetails";
import Button from "@mui/material/Button";
import plusIcon from "/assets/img/plus-redcircle.svg";

// import Colors from '@/app/reusableComponent/styles'
import { Colors } from "../reusableComponent/styles";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Addprojectpopup } from "./addprojectpopup";
import { Idetails } from "./idetail";
import { customsheet } from "../reusableComponent/JsonData";
import { AssinedProjectlist } from "../reusableComponent/JsonData";
import { TimesheetExpenceAndHoursField } from "../reusableComponent/timesheetexpenceandhoursfield";

export default function Timesheetcalendar({
  Customertimesheetdata,
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
        (list) => list.projectid !== selectedProject.projectid
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
            <h2 className="para ms-2 mb-0 shade">Annual leave summary</h2>
          </div>
          {/* Annula leave summary */}
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="ms-4 px-3 py-1"
          >
            <IconOutlinebutton
              color={useColors.themeRed}
              border={`1px solid ${useColors.themeRed}`}
              text="Upload"
              fontSize="12px"
              disabled={false}
              icon={"/assets/img/plus-redcircle.svg"}
              variant={"outlined"}
            />
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-12">
          {/* <div className="timesheetlist mb-1 align-items-center py-2">
            <div className="d-flex">
              <select
                className="projectlist para ms-3 bg-transparent"
                style={{ outline: "0px" }}
                onChange={handleProjectChange}
                value={selectedProjected}
              >
                {AssinedProjectlist?.map((project, index) => (
                  <option key={project?.projectid ?? index} value={index}>
                    {project.projectname}
                  </option>
                ))}
              </select>
              <div
                className="d-flex align-items-center ms-4"
                style={{ cursor: "pointer" }}
                onClick={() => openproject((prev) => !prev)}
              >
                <AddCircleOutlineOutlinedIcon
                  sx={{ color: useColors.themeRed }}
                />
                <h2
                  className="para ms-2 mb-0 shade"
                  style={{ color: useColors.themeRed }}
                >
                  Add
                </h2>
              </div>
            </div>
          </div> */}
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
