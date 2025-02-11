"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Outlinebutton from "../outlinebtn";
import TimeOffDetails from "@/app/timeoff/components/timeoffdetails";

export function CenterPopup({ show, close, projectLists }: any) {
  const [selectedProjects, setSelectedProjects] = useState<
    { projectid: string; projectname: string }[]
  >([]);

  const handleSave = () => {
    projectLists(selectedProjects);
    close();
  };

  return (
    <>
      <section
        className={`showpopup ${show ? "showpopupactive" : ""}`}
        onClick={close}
      >
        <div
          className="summarysection  mx-auto px-2 py-2"
          style={{
            height: "fit-content",
            alignSelf: "center",
            width: "400px",
            overflowY: "auto",
            borderRadius: "8px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="container-fluid">
            <div className="row px-2">
              <div className="col-12">
                <div className="summary py-1 d-flex justify-content-between align-items-center">
                  <h5 className="heading2 me-3 textheader mb-0">
                    Time off details
                  </h5>
                  <FontAwesomeIcon
                    style={{ cursor: "pointer" }}
                    className="my-2 textheader"
                    icon={faXmark}
                    onClick={close}
                  />
                </div>
                <hr className="m-0" />
                <TimeOffDetails />
              </div>
            </div>
            <div className="row mt-3 px-2">
              <div className="col-12 mb-3 d-flex justify-content-end mt-4">
                <div className="ms-3">
                  <Outlinebutton
                    color="#808080"
                    border="1px solid #808080"
                    text="Cancel"
                    fontSize="12px"
                    background="transparent"
                    onClick={close}
                    variant={"outlined"}
                  />
                </div>
                <div className="ms-3">
                  <Outlinebutton
                    color="#FFF"
                    border="1px solid #FF6F6F"
                    text="Save"
                    fontSize="12px"
                    background="#FF6F6F"
                    onClick={handleSave}
                    variant={"outlined"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>
    </>
  );
}
