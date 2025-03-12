import React, { useEffect, useState } from "react";
import "../timeoff.css";
import { typeOfDays } from "@/app/reusableComponent/JsonData";
import RowRadioButtons from "@/app/reusableComponent/radiobtn";
import DatePickerComponent from "@/app/reusableComponent/datepicler";
import TimePickerComponent from "@/app/reusableComponent/timepicker";

function Typeofduration() {
  // Single source of truth for the selected radio button
  const [dayType, setDayType] = useState<string>("");

  useEffect(() => {
    if (!dayType && typeOfDays.length > 0) {
      setDayType(typeOfDays[0].name); // Select the first option as default
    }
  }, [dayType]);

  return (
    <div>
      <p id="demo-row-radio-buttons-group-label">Duration Type</p>
      <RowRadioButtons
        list={typeOfDays}
        selectedValue={dayType}
        newDayTypevalue={(data: string) => setDayType(data)}
      />

      {dayType === "Full Day" && (
        <div className="row px-0 justify-content-between">
          <div className="col-6 px-0 ">
            <div className="" style={{ width: "90%" }}>
              <DatePickerComponent />
            </div>
          </div>
          <div className="col-6 px-0  d-flex justify-content-end">
            <div style={{ width: "90%" }}>
              <select className="w-100 p-3 rounded textheader" name="" id="">
                <option value="">Select Type of Time off</option>
                <option value="pto">PTO</option>
                <option value="lop">LOP</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {dayType === "Partial Day" && (
        <div className="row px-0 justify-content-between">
          <div className="col-6 px-0  mb-3">
            <div style={{ width: "90%" }}>
              <DatePickerComponent />
            </div>
          </div>
          <div className="col-6 px-0  d-flex justify-content-end mb-3">
            <div style={{ width: "90%" }}>
              <div style={{ width: "90%" }}>
                <select className="w-100 p-3 rounded textheader" name="" id="">
                  <option value="">Select Hours</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-6 px-0 ">
            <div style={{ width: "90%" }}>
              <select className="w-100 p-3 rounded textheader" name="" id="">
                <option value="">Select Type of Time off</option>
                <option value="pto">PTO</option>
                <option value="lop">LOP</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {dayType === "Multiple Days" && (
        <div className="row px-0 justify-content-between">
          <div className="col-6 px-0  mb-3">
            <div style={{ width: "90%" }}>
              <DatePickerComponent />
            </div>
          </div>
          <div className="col-6 px-0  d-flex justify-content-end mb-3">
            <div style={{ width: "90%" }}>
              <DatePickerComponent />
            </div>
          </div>
          <div className="col-6 px-0  ">
            <div style={{ width: "90%", background: "white" }}>
              <select className="w-100 p-3 rounded textheader" name="" id="">
                <option value="">Select Type of Time off</option>
                <option value="pto">PTO</option>
                <option value="lop">LOP</option>
              </select>
            </div>
          </div>
        </div>
      )}
      <div className="row px-0">
        <div className="col-12 px-0">
          <textarea
            className="form-control mt-3 w-100"
            id="exampleFormControlTextarea1"
            rows={5}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Typeofduration;
