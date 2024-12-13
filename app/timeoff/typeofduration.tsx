import React, { useEffect, useState } from "react";
import RowRadioButtons from "../reusableComponent/radiobtn";
import { typeOfDays } from "../reusableComponent/JsonData";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./timeoff.css";
import DatePickerComponent from "../reusableComponent/datepicler";
import TimePickerComponent from "../reusableComponent/timepicker";
import DropdownComponent from "../reusableComponent/dropdown";
import { timeOff } from "../reusableComponent/JsonData";
function Typeofduration() {
  // Single source of truth for the selected radio button
  const [dayType, setDayType] = useState<string>("");

  // Log the selected type whenever it changes
  useEffect(() => {
    console.log("Selected Day Type:", dayType);
  }, [dayType]);

  return (
    <div>
     
      <RowRadioButtons
        list={typeOfDays}
        selectedValue={dayType} // Pass the current selection as a prop
        newDayTypevalue={(data: string) => setDayType(data)} // Update the state when a radio button is clicked
      />
      <div className="row justify-content-between">
        <div className="col-6" style={{width:"30%"}}>
          <DatePickerComponent />
        </div>
        <div className="col-6  text-end" style={{width:"30%"}}>
          <TimePickerComponent />
        </div>
        {/* <div className="col-6  text-end" style={{width:"30%"}}>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            displayEmpty
            sx={{
              width: "100%", // Directly apply width to Select
              "& .MuiOutlinedInput-root": {
                // For Outlined variant of Select
                width: "100%",
                background:'white'
              },
              "& .MuiInputBase-root": {
                // For all MUI input-based components
                width: "100%",
                background:'white'
              },
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div> */}
      </div>
    </div>
  );
}

export default Typeofduration;
