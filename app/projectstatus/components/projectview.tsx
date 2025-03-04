import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Colors } from "../../reusableComponent/styles";
import ClickableChips from "@/app/reusableComponent/chips";
import user from "@/public/assets/img/Ellipse 14.svg";
import Image from "next/image";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Outlinebutton from "@/app/reusableComponent/outlinebtn";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";

function ProjectView({ show, close, projectlist }: any) {
  const [projectData] = projectlist ?? [];
  const useColors = Colors();
  const [expanded, setExpanded] = useState<string | false>(false);


  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      const target = event.target as HTMLElement; // Cast to HTMLElement

      if (target.tagName === "A" || target.closest("a")) return; // Prevent toggle if clicking a link

      sessionStorage.setItem("expandedAccordion", isExpanded ? panel : "");
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <section
      className={`showpopup ${show ? "showpopupactive" : ""}`}
      onClick={close}
    >
      <div className="summarysection" onClick={(e) => e.stopPropagation()}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-end">
              <FontAwesomeIcon
                className="my-2 textheader"
                style={{ cursor: "pointer" }}
                icon={faXmark}
                onClick={close}
              />
            </div>
          </div>
          <div className="row mt-3 px-sm-5 ">
            <div className="col-12 mb-2 p-0">
              <div className="row">
                <div className="col-8 p-0">
                  <div className="approverlist d-flex mt-2 align-items-start ">
                    <div style={{ width: "60px", height: "60px" }}>
                      <Image className="w-100 h-100" src={user} alt={""} />
                    </div>
                    <div className="roles ">
                      <h5 className="heading2 textheader ps-2 mb-2">
                        {projectData?.project_name + " "}(
                        {projectData?.projectId})
                      </h5>
                      <p className="para ps-2 mb-2 mt-1 shade">Employee</p>
                      <div className="para ps-1 mb-0 mt-2 shade">
                        <ClickableChips
                          label={
                            projectData?.status.charAt(0).toUpperCase() +
                            projectData?.status.slice(1)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4 ">
                  <div className="d-flex justify-content-end">
                    <Outlinebutton
                      color={useColors.themeRed}
                      border={`1px solid ${useColors.themeRed}`}
                      text="Download Pdf"
                      fontSize="12px"
                      background="transparent"
                      onClick={close}
                      iscontactus={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr />
            {/* Content Section */}

            <div className="col-12 timesheetdetails  align-items-center d-flex mt-4 mb-4">
              <AutoGraphIcon />

              <p className="para ps-2 mb-0 unselectcolor">
                Lorem ipsum dolor sit amet consectetur. Morbi nulla
              </p>
            </div>

            <div className="row justify-content-between p-0 mb-4">
              <div
                className="d-flex justify-content-between "
                style={{ width: "40%" }}
              >
                <div className="d-flex align-items-center">
                  <CalendarMonthOutlinedIcon />

                  <p className="para ps-2 mb-0 unselectcolor">Start Date</p>
                </div>
                <div className="div">{projectData?.start_date}</div>
              </div>

              <div
                className="d-flex justify-content-between"
                style={{ width: "40%" }}
              >
                <div className="d-flex align-items-center">
                  <CalendarMonthOutlinedIcon />

                  <p className="para ps-2 mb-0 unselectcolor">End Date</p>
                </div>
                <div className="div">{projectData?.end_date}</div>
              </div>
            </div>

            <div className="row justify-content-between p-0 mb-4">
              <div
                className="d-flex justify-content-between "
                style={{ width: "40%" }}
              >
                <div className="d-flex align-items-center ">
                  <CheckBoxRoundedIcon />

                  <p className="para ps-2 mb-0 unselectcolor">Priority</p>
                </div>
                <div
                  className="w-20 h-30 text-center p-1"
                  style={{
                    background: "#E1F3D3",
                    color: "#56CA00",
                    borderRadius: "17px",
                  }}
                >
                  Low
                </div>
              </div>

              <div
                className="d-flex justify-content-between "
                style={{ width: "40%" }}
              >
                <div className="d-flex align-items-center">
                  <BarChartRoundedIcon />

                  <p className="para ps-2 mb-0 unselectcolor">
                    Status summary{" "}
                  </p>
                </div>
                <div
                  className="w-20 h-30 text-center p-1"
                  style={{
                    background: "#FFB40029",
                    color: "#FFB400",
                    borderRadius: "17px",
                  }}
                >
                  Yellow
                </div>
              </div>
            </div>

            {/* accordian Section */}
            <div className="col-12">
              {[
                { id: "1", name: "Project description", content: "ABC" },
                { id: "2", name: "Issues", content: "ABC" },
                {
                  id: "3",
                  name: "Key Accomplished list period",
                  content: "ABC",
                },
                { id: "4", name: "Upcoming Task", content: "ABC" },
              ].map((item: any) => (
                <div key={item?.id}>
                  <Accordion
                    expanded={expanded === item?.id}
                    onChange={handleChange(item?.id)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      sx={{ background: "#F6F7FB" }}
                    >
                      <Typography component="span">{item?.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>{item?.content}</AccordionDetails>
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProjectView;
