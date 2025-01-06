"use client";
import ImageComponent from "@/app/reusableComponent/image";
import React, {useState } from "react";
import Typeofduration from "./typeofduration";
import Outlinebutton from "@/app/reusableComponent/outlinebtn";
import DropdownComponent from "@/app/reusableComponent/dropdown";
import RowRadioButtons from "@/app/reusableComponent/radiobtn";
import Timeoffstatus from "./timeoffstatus";
import { Colors } from "@/app/reusableComponent/styles";
import { year } from "@/app/reusableComponent/JsonData";
import { TimeOffRequestList } from "@/app/reusableComponent/JsonData";

export default function Requesttimeoff() {
  const [statusHistory, setStatusHistory] = useState<string>("Status");
  const [selectedTimeOff, setSelectedTimeOff] = useState("");
  const useColors = Colors();

  const handleSubmit = () => {
    alert("Submitted Successfully");
  };

  return (
    <div>
      <div className="d-flex gap-3 flex-wrap">
        {TimeOffRequestList?.map((timeoffrequest: any) => (
          <div
            key={timeoffrequest?.id}
            className="dashboardcard d-flex  flex-column  p-3 "
          >
            <div className="d-flex gap-2 align-items-center">
              <ImageComponent width={0} height={0} user={""} />
              <h6 className="mb-0 textheader heading2">
                {timeoffrequest?.count}
              </h6>
            </div>
            <p className="para2 pt-2  mb-0 shade">
              {timeoffrequest?.name} ({timeoffrequest?.hrs})
            </p>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="row mt-5">
        <div className="col-12 col-md-5 ">
          <Typeofduration />

          <div className="col-12 d-flex justify-content-center gap-5 py-4">
            <div className="ms-3">
              <Outlinebutton
                color={useColors.themeRed}
                border={`1px solid ${useColors.themeRed}`}
                text="Clear"
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
                variant={"outlined"}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
        <div className=" col-12 col-md-7  ">
          <div className="dashboardcard p-3">
            <div className="d-flex justify-content-between">
              <p>Time off Status (Self)</p>

              <DropdownComponent
                dropdownlist={year}
                isYear={true}
                selectedDatafunction={(data: any) => setSelectedTimeOff(data)}
              />
            </div>
            <RowRadioButtons
              list={[
                {
                  id: 1,
                  name: "Status",
                },
                {
                  id: 2,
                  name: "History",
                },
              ]}
              selectedValue={statusHistory}
              newDayTypevalue={(data: string) => setStatusHistory(data)}
            />
            <Timeoffstatus statusHistory={statusHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}
