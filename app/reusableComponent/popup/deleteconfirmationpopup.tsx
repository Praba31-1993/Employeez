"use client";
import React from "react";
import Outlinebutton from "../outlinebtn";
import {faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import whitecolordelete from "@/public/assets/img/delete_whitecolor.svg";
import Image from "next/image";
import "../stylessheetforreusablecomponent.css";
import { Colors } from "../styles";

function Deleteconfirmationpopup({ show, close }: any) {
  const handleSave = () => {
    close();
  };
 const useColors = Colors();
  return (
    <>
      <div
        className={`showpopup ${show ? "showpopupactive" : ""}`}
        onClick={close}
      >
        <div
          className="mx-auto deletepopup" 
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="row m-0 rounded bg-white"
          >
            <div className="col-12 p-0">
              <div className="d-flex justify-content-end align-items-center pe-2 deletePopupTopHeaderStyle" style={{backgroundColor:useColors.themeRed}}>
                <FontAwesomeIcon
                  className="my-2 textheader cursorPointer"
                  icon={faXmark}
                  onClick={close}
                />
              </div>
            </div>
            <div
              className="col-12 p-0 d-flex justify-content-center "
              style={{ background: "white" }}
            >
              <div className="deleteIcon" style={{backgroundColor:useColors.themeRed}}>
                <Image
                  src={whitecolordelete}
                  alt=""
                  width={0}
                  height={0}
                  style={{ cursor: "pointer", margin: "14px"  }}
                />
              </div>
            </div>
            <div className="col-12 py-0 text-center px-4 deletePopupContentSection">
              <p className="my-2 heading2 dropdowncolor">Confirm Deletion</p>
              <p className="my-2 heading2 shade">
                Are you sure you want to delete this record? This action cannot
                be undone. Please confirm your choice."
              </p>
            </div>
            <div
              className="col-12 d-flex justify-content-center gap-5 py-4"
              style={{ background: "white" }}
            >
              <div className="ms-3">
                <Outlinebutton
                   color={useColors.themeRed}
                   border={`1px solid ${useColors.themeRed}`}
                   text="Clear"
                   fontSize="12px"
                   background="transparent"
                   variant={"outlined"}
                  onClick={close}
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
                  onClick={handleSave}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Deleteconfirmationpopup;
