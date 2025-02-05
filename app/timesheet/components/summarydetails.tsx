"use client";
import { useEffect, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Summarycards from "./summarycards";

export default function Summarydetails({ showpop, close, LeaveTypes }: any) {
  const [typeOfLeaves, setTypeOfLeaves] = useState<any>();

  useEffect(() => {
    const TypesOfLeaves = LeaveTypes?.filter(
      (list: any) => list?.showFlag === true
    );
    setTypeOfLeaves(TypesOfLeaves);
  }, [LeaveTypes]);

  const leaveTypeImages = [
    { label: "Eligible PTO/EL", img: "/assets/img/eligiblePTOEL.svg" },
  ];

  return (
    <>
      <section
        className={`showpopup ${showpop ? "showpopupactive" : ""}`}
        onClick={close}
      >
        <div className="summarysection " onClick={(e) => e.stopPropagation()}>
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
                <div className="summary py-3 d-flex justify-content-between align-items-center">
                  <h5 className="heading me-3 textheader mb-0">
                    Summary for period
                  </h5>
                  <h5 className="heading me-3 textheader mb-0">
                    01-07 November 2024
                  </h5>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              {typeOfLeaves?.map((leave: any, index: number) => (
                <div key={index} className="col-lg-3 py-2">
                  <Summarycards
                    leaveData={leave}
                    leaveTypeimages={leaveTypeImages}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
