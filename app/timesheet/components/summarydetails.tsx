"use client";
import { useEffect, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Summarycards from "./summarycards";
import { year, TimeOffRequestList } from "@/app/reusableComponent/JsonData";
// Import icons
import AvTimerRoundedIcon from '@mui/icons-material/AvTimerRounded';
import HealingIcon from '@mui/icons-material/Healing'; // Sick Leave
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation'; // Maternity Leave
import WorkOffIcon from '@mui/icons-material/WorkOff'; // Unpaid Leave
import HomeWorkIcon from '@mui/icons-material/HomeWork'; // Work from Home
import { Colors } from "@/app/reusableComponent/styles";
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


export default function Summarydetails({ showpop, close, LeaveTypes }: any) {
    const [loading, setLoading] = useState(true);

    interface VacationDetails {
        vacationYear: number;
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
        empEligSickLeave?: number;
        empTotalHolidays?: number;
        empUsedHolidays?: number;
        empImportantContact?: string;
    }

    const [showVacation, setShowVacation] = useState<VacationDetails[]>([]);;
    const useColors = Colors();
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
    const renderVacationColumn = (label: string, value: number | undefined, IconComponent: any) => {
        const displayValue = value ?? 0; // Fallback to 0 if value is undefined
        return (
            <div className="col-lg-3 col-xxl-2 col-4 mb-3">
                <div className="summarydetailscards h-100 p-3">
                    <div className="d-flex gap-2 align-items-center">
                        <div
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{ background: useColors.themeRed, width: "40px", height: "40px" }}
                        >
                            <IconComponent className="text-white" sx={{ fontSize: "24px" }} />
                        </div>
                        <h6 className="mb-0 textheader heading2">{displayValue}</h6>
                    </div>
                    <p className="para pt-2 textheader mb-0 shade">{label}</p>
                </div>
            </div>
        );
    };



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
                                        {showVacation?.[0]?.vacationYear}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {showVacation?.[0]?.showVacation && (

                                <div className="row " >

                                    {/* PTO Section */}
                                    {showVacation[0].ptoRequest && (
                                        <>
                                            {renderVacationColumn("Eligible PTO", showVacation[0].empEligPaidLeaves, AvTimerIcon)}
                                            {renderVacationColumn("Accrued PTO", showVacation[0].empAccrued_PaidLeaves, HourglassBottomOutlinedIcon)}
                                            {renderVacationColumn("Used PTO", showVacation[0].empUsedPaidLeaves, HourglassTopIcon)}
                                            {renderVacationColumn("Balance PTO", showVacation[0].empBalancePto, BeachAccessIcon)}
                                        </>
                                    )}

                                    {/* Casual Leave Section */}
                                    {showVacation[0].casualRequest && (
                                        <>
                                            {renderVacationColumn("Eligible CL", showVacation[0].empEligCasualLeaves, AirlineSeatIndividualSuiteOutlinedIcon)}
                                            {renderVacationColumn("Accrued CL", showVacation?.[0]?.empAccrued_CasualLeaves, AirlineSeatIndividualSuiteOutlinedIcon)}
                                            {renderVacationColumn("Used CL", showVacation[0].empUsedCasualLeaves, AirlineSeatIndividualSuiteOutlinedIcon)}
                                            {renderVacationColumn("Balance CL", showVacation[0].empBalanceCL, AirlineSeatIndividualSuiteOutlinedIcon)}
                                        </>
                                    )}

                                    {/* Sick Leave Section */}
                                    {showVacation[0].sickRequest && (
                                        <>
                                            {renderVacationColumn("Eligible Sick Leave", showVacation[0].empEligSickLeave, SickIcon)}
                                            {renderVacationColumn("Accrued Sick Leave", showVacation[0].empAccured_SickLeave, SickIcon)}
                                            {renderVacationColumn("Used Sick Leave", showVacation?.[0]?.empUsedCasualLeaves, SickIcon)}
                                            {renderVacationColumn("Balance Sick Leave", showVacation[0].empBalanceSL, SickIcon)}
                                        </>
                                    )}
                                    {/* Total Holidays */}
                                    {renderVacationColumn("Total Holidays", showVacation?.[0]?.empTotalHolidays, LuggageOutlinedIcon)}
                                    {renderVacationColumn("Used Holidays", showVacation?.[0]?.empUsedHolidays, LuggageIcon)}

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}