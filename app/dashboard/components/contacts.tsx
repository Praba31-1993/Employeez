"use client";
import Image from "next/image";
import React from "react";
import user from "@/app/assets/img/Ellipse 14.svg";
import { ContactsList } from "@/app/reusableComponent/JsonData";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style: React.CSSProperties = {
  position: "absolute",
  top: "5em",
  right: "0",
  width: 400,
  backgroundColor: "#0600000d",
  borderRadius: "14px",
  border: 0,
};

interface ContactsProps {
  showpop: boolean;
  close: () => void;
}
function Contacts({ showpop, close }: ContactsProps) {
  console.log("show", showpop);

  return (
    <>
      {/* <Modal
        open={show}
        onClose={close}
        sx={{ "& .MuiBackdrop-root": { backgroundColor: "#0600000d" } }} // Transparent backdrop
      >
        <div style={style}>
          <div className="card p-2" style={{ outline: "0px !important" }}>
            <div className="card-body">
              <div className="text-end d-flex justify-content-between">
                <div>
                  <p className="heading2 mb-0 text-start">
                    Important contact (20)
                  </p>
                  <p className="shade para mb-0">
                    All important contacts displayed here
                  </p>
                </div>
                <FontAwesomeIcon
                  icon={faXmark}
                  style={{ cursor: "pointer", color: "red" }} // Set color directly here
                  className="my-2"
                  onClick={() => close()}
                />
              </div>
              <hr />
              {ContactsList?.map((contact: any, index: number) => (
                <div
                  className="d-flex align-items-center mb-3"
                  key={contact?.id}
                >
                  <div className="userimages">
                    <Image className="" src={user} alt={""} />
                  </div>
                  <div className="ps-2">
                    <h5 className="para2 textheader mb-0">
                      {contact?.name} ({contact?.role})
                    </h5>
                    <p className="shade para2 mb-0">
                      <MailOutlineOutlinedIcon sx={{ color: "#D9D9D9" }} />{" "}
                      <span>{contact?.mail}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal> */}

      {/*  */}

      <section className={`showpopup ${showpop ? "showpopupactive" : ""}`}>
        <div className="summarysection">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 text-end">
                <FontAwesomeIcon
                  style={{ cursor: "pointer" }}
                  className="my-2 textheader"
                  icon={faXmark}
                  onClick={close}
                />
              </div>
              <div className="col-12">
                <div>
                  <p className="heading2 mb-0 text-start">
                    Important contact (20)
                  </p>
                  <p className="shade para mb-0">
                    All important contacts displayed here
                  </p>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              {ContactsList?.map((contact: any, index: number) => (
                <div
                  className="d-flex align-items-center mb-3"
                  key={contact?.id}
                >
                  <div className="userimages">
                    <Image className="" src={user} alt={""} />
                  </div>
                  <div className="ps-2">
                    <h5 className="para2 textheader mb-0">
                      {contact?.name} ({contact?.role})
                    </h5>
                    <p className="shade para2 mb-0">
                      <MailOutlineOutlinedIcon sx={{ color: "#D9D9D9" }} />{" "}
                      <span>{contact?.mail}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contacts;
