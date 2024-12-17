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
import { Colors } from "../reusableComponent/styles";
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
                selectedValue={dayType} // Pass the current selection as a prop
                newDayTypevalue={(data: string) => setDayType(data)} // Update the state when a radio button is clicked
            />

            {dayType === "Full Day" && (
                <div className="row justify-content-between">
                    <div className="col-6">
                        <div className="" style={{width:"90%"}}>
                            <DatePickerComponent />
                        </div>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <div className="  "  style={{width:"90%"}}>
                            <TimePickerComponent />
                        </div>
                    </div>
                </div>
            )}

            {dayType === "Partial Day" && (
                <div className="row justify-content-between">
                    <div className="col-6 mb-4">
                        <div style={{width:"90%"}}>
                            <DatePickerComponent />
                        </div>
                    </div>
                    <div className="col-6 d-flex justify-content-end mb-4">
                        <div style={{width:"90%"}}>
                            <TimePickerComponent />
                        </div>
                    </div>
                    <div className="col-6">
                        <div style={{width:"90%",background: "white"}} >
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                displayEmpty
                                sx={{
                                    width: "100%", // Directly apply width to Select
                                    "& .MuiOutlinedInput-root": {
                                        // For Outlined variant of Select
                                        width: "100%",
                                        background: "white",
                                    },
                                    "& .MuiInputBase-root": {
                                        // For all MUI input-based components
                                        width: "100%",
                                        background: "white",
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
                        </div>
                    </div>
                </div>
            )}

            {dayType === "Multiple Days" && (
                <div className="row justify-content-between">
                    <div className="col-6 mb-3">
                        <div style={{width:"90%"}}>
                            <DatePickerComponent />
                        </div>
                    </div>
                    <div className="col-6  d-flex justify-content-end mb-3">
                        <div style={{width:"90%"}}>
                            <DatePickerComponent />
                        </div>
                    </div>
                    <div className="col-6  ">
                        <div style={{width:"90%",background: "white"}} >
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                displayEmpty
                                sx={{
                                    width: "100%", // Directly apply width to Select
                                    "& .MuiOutlinedInput-root": {
                                        // For Outlined variant of Select
                                        width: "100%",
                                        background: "white",
                                    },
                                    "& .MuiInputBase-root": {
                                        // For all MUI input-based components
                                        width: "100%",
                                        background: "white",
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
                        </div>
                    </div>
                </div>
            )}
            <div className="row px-2">
                <textarea
                    className="form-control mt-3 w-100"
                    id="exampleFormControlTextarea1"
                    rows={5}
                ></textarea>
            </div>
        </div>
    );
}

export default Typeofduration;
