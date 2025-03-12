"use client";
import { useEffect, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Summarycards from "./summarycards";
import { year, TimeOffRequestList } from "@/app/reusableComponent/JsonData";
// Import icons
import AvTimerRoundedIcon from '@mui/icons-material/AvTimerRounded';
import HealingIcon from '@mui/icons-material/Healing'; // Sick Leave
import BeachAccessIcon from '@mui/icons-material/BeachAccess'; // Casual Leave
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation'; // Maternity Leave
import WorkOffIcon from '@mui/icons-material/WorkOff'; // Unpaid Leave
import HomeWorkIcon from '@mui/icons-material/HomeWork'; // Work from Home
import { Colors } from "@/app/reusableComponent/styles";

export default function Summarydetails({ showpop, close, LeaveTypes }: any) {
    const [typeOfLeaves, setTypeOfLeaves] = useState<any>();
    const useColors = Colors();
    useEffect(() => {
        const TypesOfLeaves = LeaveTypes?.filter(
            (list: any) => list?.showFlag === true
        );
        setTypeOfLeaves(TypesOfLeaves);
    }, [LeaveTypes]);

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
                            {TimeOffRequestList?.map((timeoffrequest: any) => {
                                const IconComponent = iconMapping[timeoffrequest?.name] || AvTimerRoundedIcon; // Default icon
                                return (
                                    <div key={timeoffrequest?.id} className="col-lg-2 col-4 mb-3">
                                        <div className="summarydetailscards h-100 p-3">
                                            <div className="d-flex gap-2 align-items-center">
                                                <div
                                                    className="rounded-circle"
                                                    style={{ background: useColors.themeRed, padding: "8px" }}
                                                >
                                                    <IconComponent className="text-white m-1" />
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
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
