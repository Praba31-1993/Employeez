"use client";
import React from "react";
import Outlinebutton from "../outlinebtn";
import {faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import whitecolordelete from "@/public/assets/img/delete_whitecolor.svg";
import Image from "next/image";
import "../stylessheetforreusablecomponent.css";

function Deleteconfirmationpopup({ show, close }: any) {
  const handleSave = () => {
    close();
  };

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
            className="row m-0"
            style={{
              borderRadius: "8px",
            }}
          >
            <div className="col-12 p-0">
              <div className="d-flex justify-content-end align-items-center pe-2 deletePopupTopHeaderStyle">
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
              <div className="deleteIcon">
                <Image
                  src={whitecolordelete}
                  alt=""
                  width={0}
                  height={0}
                  style={{ cursor: "pointer", margin: "20px" }}
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
                  color="#808080"
                  border="1px solid #808080"
                  text="Cancel"
                  fontSize="14px"
                  background="transparent"
                  onClick={close}
                  variant={"outlined"}
                />
              </div>
              <div className="ms-3">
                <Outlinebutton
                  color="#FFF"
                  border="1px solid #FF6F6F"
                  text="Confirm"
                  fontSize="14px"
                  background="#FF6F6F"
                  onClick={handleSave}
                  variant={"outlined"}
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
