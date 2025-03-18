"use client";
import ImageComponent from "@/app/reusableComponent/image";
import React, { useEffect, useState } from "react";
import Typeofduration from "./typeofduration";
import Outlinebutton from "@/app/reusableComponent/outlinebtn";
import DropdownComponent from "@/app/reusableComponent/dropdown";
import RowRadioButtons from "@/app/reusableComponent/radiobtn";
import Timeoffstatus from "./timeoffstatus";
import { Colors } from "@/app/reusableComponent/styles";
import { year, TimeOffRequestList } from "@/app/reusableComponent/JsonData";

// Import icons
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import LuggageIcon from "@mui/icons-material/Luggage";
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import SickIcon from "@mui/icons-material/Sick";
import { getEmpVacationDetails } from "@/app/api/Listingapis";
import AvTimerIcon from '@mui/icons-material/AvTimer';
import AirlineSeatIndividualSuiteOutlinedIcon from '@mui/icons-material/AirlineSeatIndividualSuiteOutlined';

export default function Requesttimeoff() {
    const [statusHistory, setStatusHistory] = useState<string>("Status");
    const [selectedTimeOff, setSelectedTimeOff] = useState("");
    const [loading, setLoading] = useState(true);
    const useColors = Colors();

    interface VacationDetails {
        showVacation: boolean;
        ptoRequest?: boolean;
        empEligPaidLeaves?: number;
        empAccrued_PaidLeaves?: number;
        empUsedPaidLeaves?: number;
        empBalancePto?: number;
        casualRequest?: boolean;
        empEligCasualLeaves?: number;
        empAccrued_CasualLeaves?: number;
        empUsedCasualLeaves?: number;
        empBalanceCL?: number;
        sickRequest?: boolean;
        empUsedSickLeaves?: number;
        empAccured_SickLeave?: number;
        empBalanceSL?: number;
        empEligSickLeaves?: number;
        empTotalHolidays?: number;
        empUsedHolidays?: number;
        empImportantContact?: string;
    }

    const [showVacation, setShowVacation] = useState<VacationDetails[]>([]);

    const handleSubmit = () => {
        alert("Submitted Successfully");
    };
    useEffect(() => {
        const rememberedUser = localStorage.getItem("rememberedUserId");

        let userId = null;
        try {
            userId = rememberedUser ? JSON.parse(rememberedUser)?.EmpId : rememberedUser;
        } catch (error) {
            userId = rememberedUser; // If it's not JSON, assume it's a string
        }

        if (userId) {
            Vacationdetails(userId);
        }

        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const Vacationdetails = async (userId: string) => {
        try {
            const response = await getEmpVacationDetails(userId);
            console.log("Vacation details response:", response);

            if (response.status === 200 && response?.data) {
                const fetchedVacation = response?.data;
                setShowVacation(fetchedVacation);
                console.log("showVacation", fetchedVacation);
            }
        } catch (error) {
            console.error("Error fetching vacation details:", error);
        }
    };
    const renderVacationColumn = (label: string, value: number | undefined, bgColor: string, IconComponent: any) => {
        const displayValue = value ?? 0; // Fallback to 0 if value is undefined
        return (
            <div className="col-lg-2 col-4 mb-3">
                <div className="dashboardcard h-100 p-3">
                    <div className="d-flex gap-2 align-items-center">
                        <div
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{ background: bgColor, width: "40px", height: "40px" }}
                        >
                            <IconComponent className="textheader" sx={{ fontSize: "24px" }} />
                        </div>
                        <h6 className="mb-0 textheader heading2">{displayValue}</h6>
                    </div>
                    <p className="para pt-2 textheader mb-0 shade">{label}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="row px-0">
            {/* Time Off Request List */}

            {showVacation?.[0]?.showVacation && (

                <div className="row " >
                    {/* PTO Section */}
                    {showVacation[0].ptoRequest && (
                        <>
                            {renderVacationColumn("Eligible PTO", showVacation[0].empEligPaidLeaves, "#a2f378", AvTimerIcon)}
                            {renderVacationColumn("Accrued PTO", showVacation[0].empAccrued_PaidLeaves, "#DAC5FF", HourglassBottomOutlinedIcon)}
                            {renderVacationColumn("Used PTO", showVacation[0].empUsedPaidLeaves, "#FFC890", HourglassTopIcon)}
                            {renderVacationColumn("Balance PTO", showVacation[0].empBalancePto, "#7f87eb9e", BeachAccessIcon)}
                        </>
                    )}

                    {/* Casual Leave Section */}
                    {showVacation[0].casualRequest && (
                        <>
                            {renderVacationColumn("Eligible CL", showVacation[0].empEligCasualLeaves, "#a2f378", AirlineSeatIndividualSuiteOutlinedIcon)}
                            {renderVacationColumn("Accrued CL", showVacation?.[0]?.empAccrued_CasualLeaves, "#DAC5FF", AirlineSeatIndividualSuiteOutlinedIcon)}
                            {renderVacationColumn("Used CL", showVacation[0].empUsedCasualLeaves, "#FFC890", AirlineSeatIndividualSuiteOutlinedIcon)}
                            {renderVacationColumn("Balance CL", showVacation[0].empBalanceCL, "#7f87eb9e", AirlineSeatIndividualSuiteOutlinedIcon)}
                        </>
                    )}

                    {/* Sick Leave Section */}
                    {showVacation[0].sickRequest && (
                        <>
                            {renderVacationColumn("Eligible Sick Leave", showVacation[0].empEligSickLeaves, "#a2f378", SickIcon)}
                            {renderVacationColumn("Accrued Sick Leave", showVacation[0].empAccured_SickLeave, "#DAC5FF", SickIcon)}
                            {renderVacationColumn("Used Sick Leave", showVacation?.[0]?.empUsedCasualLeaves, "#FFC890", SickIcon)}
                            {renderVacationColumn("Balance Sick Leave", showVacation[0].empBalanceSL, "#7f87eb9e", SickIcon)}
                        </>
                    )}
                    {/* Total Holidays */}
                    {renderVacationColumn("Total Holidays", showVacation?.[0]?.empTotalHolidays, "#b3ef6d", LuggageOutlinedIcon)}
                    {renderVacationColumn("Used Holidays", showVacation?.[0]?.empUsedHolidays, "#7acdf5", LuggageIcon)}

                </div>
            )}

           


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
