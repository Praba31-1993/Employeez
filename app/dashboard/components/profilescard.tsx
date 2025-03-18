"use client";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IconOutlinebutton } from "@/app/reusableComponent/outlinebtn";
import Menulistitem from "@/app/reusableComponent/menulist";
import { Colors } from "@/app/reusableComponent/styles";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Timer from "@/app/reusableComponent/timer";
import Contacts from "./contacts";

// Import icons
import {
    HourglassBottomOutlined as HourglassBottomOutlinedIcon,
    Luggage as LuggageIcon,
    LuggageOutlined as LuggageOutlinedIcon,
    BeachAccess as BeachAccessIcon,
    HourglassTop as HourglassTopIcon,
    Sick as SickIcon,
    AvTimer as AvTimerIcon,
    AirlineSeatIndividualSuiteOutlined as AirlineSeatIndividualSuiteOutlinedIcon,
    SupervisorAccountOutlined as SupervisorAccountOutlinedIcon,
} from "@mui/icons-material";

import { getEmpVacationDetails } from "@/app/api/Listingapis";

export default function ProfilesCard() {
    const useColors = Colors();
    const [open, setOpen] = useState(false);
    const [punchIn, setPunchIn] = useState<boolean>(false);
    const [totalTime, setTotalTime] = useState<string>("");
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const rememberedUser = localStorage.getItem("rememberedUserId");

        let userId: string | null = null;
        try {
            userId = rememberedUser ? JSON.parse(rememberedUser)?.EmpId : rememberedUser;
        } catch {
            userId = rememberedUser; // If it's not JSON, assume it's a string
        }

        if (userId) {
            Vacationdetails(userId);
        }

        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const Vacationdetails = async (userId: string) => {
        try {
            const response = await getEmpVacationDetails(userId);
            if (response.status === 200 && Array.isArray(response?.data)) {
                setShowVacation(response.data);
            } else {
                setShowVacation([]);
            }
        } catch (error) {
            console.error("Error fetching vacation details:", error);
        }
    };

    const renderVacationColumn = (
        label: string,
        value: number | undefined,
        bgColor: string,
        IconComponent: any
    ) => (
        <div className="listofholidays">
            <div className="d-flex gap-2 align-items-center">
                <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ background: bgColor, width: "40px", height: "40px" }}
                >
                    {loading ? (
                        <Skeleton circle width={24} height={24} />
                    ) : (
                        <IconComponent className="text-white" sx={{ fontSize: "24px" }} />
                    )}
                </div>
                <h6 className="mb-0 textheader heading2">
                    {loading ? <Skeleton width={30} height={20} /> : value || 0}
                </h6>
            </div>
            <p className="para pt-2 textheader mb-0 shade" style={{ whiteSpace: "nowrap" }}>
                {loading ? <Skeleton width={80} height={15} /> : label}
            </p>
        </div>
    );

    return (
        <>
            {open && <Contacts show={open} close={() => setOpen(false)} />}
            <div className="flex justify-content-between pb-2">
                <Menulistitem />
                <div className="d-flex align-items-center pe-sm-5">
                    {loading ? (
                        <Skeleton height={20} width={100} className="me-2" />
                    ) : (
                        <p
                            className="mb-0 cursorPointer para pe-3 d-sm-block d-none"
                            style={{ color: useColors.themeRed }}
                        >
                            Supervisee
                        </p>
                    )}
                    <IconOutlinebutton
                        color={useColors.white}
                        border={`1px solid ${useColors.themeRed}`}
                        text={punchIn ? "Punch out" : "Punch in"}
                        fontSize="12px"
                        background={useColors.themeRed}
                        disabled={true}
                        onClick={() => setPunchIn((prev) => !prev)}
                        icon={punchIn ? "/assets/img/downarrrowCircle.svg" : "/assets/img/rightarrow.svg"}
                        variant={"contained"}
                    />
                    {punchIn && <Timer starttime={punchIn} timevalue={(data: any) => setTotalTime(data)} />}
                </div>
            </div>

            {showVacation.length > 0 && showVacation[0].showVacation && (
                <div className="d-flex gap-3 mt-2">
                    <div className="d-flex hiddenoverflow holidays gap-5" style={{ width: "80%", overflowX: "auto" }}>
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
                    {/* Important Contact Column */}
                    <div>
                        <div className="d-flex gap-2 align-items-center">
                            <div className="rounded-circle" style={{ background: "#FFB300" }}>
                                <SupervisorAccountOutlinedIcon className="m-1 text-white" sx={{ fontSize: "30px" }} />
                            </div>
                            <h6 className="mb-0 textheader heading2">{showVacation?.[0]?.empImportantContact}</h6>
                        </div>
                        <p className="para pt-2 mb-0 shade" style={{ color: useColors.themeRed }}>
                            Important Contact
                            <VisibilityOutlinedIcon className="ps-1 cursorpointer" onClick={() => setOpen((prev) => !prev)} />
                        </p>
                    </div>


                </div>
            )}
        </>
    );
}
