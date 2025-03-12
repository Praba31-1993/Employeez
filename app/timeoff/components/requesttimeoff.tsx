"use client";
import ImageComponent from "@/app/reusableComponent/image";
import React, { useState } from "react";
import Typeofduration from "./typeofduration";
import Outlinebutton from "@/app/reusableComponent/outlinebtn";
import DropdownComponent from "@/app/reusableComponent/dropdown";
import RowRadioButtons from "@/app/reusableComponent/radiobtn";
import Timeoffstatus from "./timeoffstatus";
import { Colors } from "@/app/reusableComponent/styles";
import { year, TimeOffRequestList } from "@/app/reusableComponent/JsonData";

// Import icons
import AvTimerRoundedIcon from '@mui/icons-material/AvTimerRounded';
import HealingIcon from '@mui/icons-material/Healing'; // Sick Leave
import BeachAccessIcon from '@mui/icons-material/BeachAccess'; // Casual Leave
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation'; // Maternity Leave
import WorkOffIcon from '@mui/icons-material/WorkOff'; // Unpaid Leave
import HomeWorkIcon from '@mui/icons-material/HomeWork'; // Work from Home

// Icon Mapping
const iconMapping: { [key: string]: React.ElementType } = {
    "Eligible PTO/EL": AvTimerRoundedIcon,
    "Sick Leave": HealingIcon,
    "Casual Leave": BeachAccessIcon,
    "Maternity Leave": BabyChangingStationIcon,
    "Paternity Leave": BabyChangingStationIcon,
    "Bereavement Leave": WorkOffIcon,
    "Personal Leave": AvTimerRoundedIcon,
    "Unpaid Leave": WorkOffIcon,
    "Work from Home": HomeWorkIcon,
    "Medical Leave": HealingIcon,
    "Half-Day Leave": AvTimerRoundedIcon,
    "Floating Holiday": BeachAccessIcon,
    "Compensatory Off": AvTimerRoundedIcon,
    "Study Leave": BeachAccessIcon,
    "Emergency Leave": WorkOffIcon,
};

// Background Color Mapping
const colorMapping: { [key: string]: string } = {
    "Eligible PTO/EL": "#DAC5FF", // Gold
    "Sick Leave": "#FFC890", // Tomato Red
    "Casual Leave": "#6eb5f1c9", // Sky Blue
    "Maternity Leave": "#DBFFC0", // Pink
    "Paternity Leave": "#DAC5FF", // Pink
    "Bereavement Leave": "#FFC890", // Dark Gray
    "Personal Leave": "#DBFFC0", // Lime Green
    "Unpaid Leave": "#DAC5FF", // Gray
    "Work from Home": "#FFC890", // Slate Blue
    "Medical Leave": "#6eb5f1c9", // Crimson
    "Half-Day Leave": "#DBFFC0", // Orange
    "Floating Holiday": "#6eb5f1c9", // Steel Blue
    "Compensatory Off": "#FFC890", // Sea Green
    "Study Leave": "#DAC5FF", // Blue Violet
    "Emergency Leave": "#DBFFC0", // Firebrick Red
};

export default function Requesttimeoff() {
    const [statusHistory, setStatusHistory] = useState<string>("Status");
    const [selectedTimeOff, setSelectedTimeOff] = useState("");
    const useColors = Colors();

    const handleSubmit = () => {
        alert("Submitted Successfully");
    };

    return (
        <div className="row px-0">
            {/* Time Off Request List */}
            {TimeOffRequestList?.map((timeoffrequest: any) => {
                const IconComponent = iconMapping[timeoffrequest?.name] || AvTimerRoundedIcon; // Default icon
                const backgroundColor = colorMapping[timeoffrequest?.name] || "#DAC5FF"; // Default background color

                return (
                    <div key={timeoffrequest?.id} className="col-lg-2 col-4 mb-3">
                        <div className="dashboardcard h-100 p-3">
                            <div className="d-flex gap-2 align-items-center">
                                <div 
                                    className="rounded-circle" 
                                    style={{ background: backgroundColor, padding: "8px" }}
                                >
                                    <IconComponent className="textheader m-1" />
                                </div>
                                <h6 className="mb-0 textheader heading2">
                                    {timeoffrequest?.hrs}
                                </h6>
                            </div>
                            <p className="para2 pt-2 mb-0 shade">
                                {timeoffrequest?.name} (Day)
                            </p>
                        </div>
                    </div>
                );
            })}

            {/* Main Section */}
            <div className="row px-0 mt-5">
                <div className="col-12 col-md-5">
                    <Typeofduration />

                    <div className="col-12 d-flex justify-content-end gap-5 py-4">
                        <div className="ms-3">
                            <Outlinebutton
                                color={useColors.themeRed}
                                border={`1px solid ${useColors.themeRed}`}
                                text="Clear"
                                fontSize="12px"
                                background="transparent"
                                variant="outlined"
                            />
                        </div>
                        <div className="ms-3">
                            <Outlinebutton
                                color="#FFF"
                                border={`1px solid ${useColors.themeRed}`}
                                text="Submit"
                                fontSize="12px"
                                background={useColors.themeRed}
                                variant="outlined"
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-7">
                    <div className="dashboardcard p-3 w-100">
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
                                { id: 1, name: "Status" },
                                { id: 2, name: "History" },
                            ]}
                            selectedValue={statusHistory}
                            newDayTypevalue={(data: string) => setStatusHistory(data)}
                        />
                        <div className="w-100" style={{ overflowX: "auto" }}>
                            <Timeoffstatus statusHistory={statusHistory} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
