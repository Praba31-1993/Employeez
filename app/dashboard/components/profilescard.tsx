"use client";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Outlinebutton, { IconOutlinebutton } from "@/app/reusableComponent/outlinebtn";
import Menulistitem from "@/app/reusableComponent/menulist";
import { Colors } from "@/app/reusableComponent/styles";
import Image from "next/image";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Timer from "@/app/reusableComponent/timer";
import Contacts from "./contacts";
import ImageComponent from "@/app/reusableComponent/image";
import { getEmpVacationDetails } from "@/app/api/Listingapis";
import LuggageIcon from '@mui/icons-material/Luggage';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';

export default function ProfilesCard() {
    const useColors = Colors();
    const [open, setOpen] = useState(false);
    const [punchIn, setPunchIn] = useState<boolean>(false);
    const [totalTime, setTotalTime] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [showVacation, setShowVacation] = useState<any>(null);

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

    const renderVacationColumn = (label: string, value: any) => {
        // Only render if value is defined (even if it is 0)
        if (value !== undefined) {
            return (
                <div className="listofholidays">
                    <div className="d-flex gap-2 align-items-center">
                        <div className="rounded-circle" style={{ background: "#FF4141" }}>
                            <LuggageIcon className="m-1 text-white" sx={{ fontSize: "30px" }} />
                        </div>
                        <h6 className="mb-0 textheader heading2">{value}</h6>
                    </div>
                    <p className="para pt-2 textheader mb-0 shade" style={{ whiteSpace: "nowrap" }}>{label}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            {open && <Contacts show={open} close={() => setOpen(false)} />}
            <div className="flex justify-content-between pb-2">
                <Menulistitem />
                <div className="d-flex align-items-center pe-sm-5">
                    {loading ? (
                        <Skeleton height={20} width={100} className="me-2" />
                    ) : (
                        <p className="mb-0 cursorPointer para pe-3 d-sm-block d-none" style={{ color: useColors.themeRed }}>
                            Supervisee
                        </p>
                    )}
                    <div>
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
                    </div>
                    {punchIn && <Timer starttime={punchIn} timevalue={(data: any) => setTotalTime(data)} />}
                </div>
            </div>

            {/* Conditional Rendering for Overall Holidays */}
            {showVacation?.[0]?.showVacation && (
                <div className="d-flex gap-3 mt-2">
                    <div className="d-flex holidays gap-5" style={{ width: "80%", overflowX: "auto" }}>

                        {/* PTO Section - Only Render if ptoRequest is True */}
                        {showVacation?.[0]?.ptoRequest && (
                            <>
                                {renderVacationColumn("Eligable PTO", showVacation?.[0]?.empEligPaidLeaves)}
                                {renderVacationColumn("Accrued PTO", showVacation?.[0]?.empAccrued_PaidLeaves)}
                                {renderVacationColumn("Used PTO", showVacation?.[0]?.empUsedPaidLeaves)}
                                {renderVacationColumn("Balance PTO", showVacation?.[0]?.empBalancePto)}
                            </>
                        )}

                        {/* Casual Leave Section - Only Render if casualRequest is True */}
                        {showVacation?.[0]?.casualRequest && (
                            <>
                                {renderVacationColumn("Eligable CL", showVacation?.[0]?.empEligCasualLeaves)}
                                {renderVacationColumn("Accrued CL", showVacation?.[0]?.empAccrued_CasualLeaves)}
                                {renderVacationColumn("Used CL", showVacation?.[0]?.empUsedCasualLeaves)}
                                {renderVacationColumn("Balance CL", showVacation?.[0]?.empBalanceCL)}
                            </>
                        )}

                        {/* Sick Leave Section - Only Render if sickRequest is True */}
                        {showVacation?.[0]?.sickRequest && (
                            <>
                                {renderVacationColumn("Eligable Sick Leave", showVacation?.[0]?.empUsedSickLeaves)}
                                {renderVacationColumn("Accrued Sick Leave", showVacation?.[0]?.empAccured_SickLeave)}
                                {renderVacationColumn("Used Sick Leave", showVacation?.[0]?.empUsedCasualLeaves)}
                                {renderVacationColumn("Balance Sick Leave", showVacation?.[0]?.empBalanceSL)}
                            </>
                        )}

                        {/* Total Holidays */}
                        {renderVacationColumn("Total Holidays", showVacation?.[0]?.empTotalHolidays)}
                        {renderVacationColumn("Used Holidays", showVacation?.[0]?.empUsedHolidays)}
                    </div>

                    {/* Important Contact Column */}
                    <div className="">
                        <div className="d-flex gap-2 align-items-center">
                            <div className="rounded-circle" style={{ background: "#FFB300" }}>
                                <SupervisorAccountOutlinedIcon className="m-1 text-white" sx={{ fontSize: "30px" }} />
                            </div>
                            <h6 className="mb-0 textheader heading2">
                                {showVacation?.[0]?.empImportantContact}
                            </h6>
                        </div>
                        <p className="para pt-2 mb-0 shade" style={{ color: useColors.themeRed }}>
                            Important Contact
                            <span>
                                <VisibilityOutlinedIcon
                                    className="ps-1 cursorPointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpen((prev) => !prev);
                                    }}
                                />
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
