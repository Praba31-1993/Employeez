"use client";
import React, { useEffect, useState } from "react";
import ImageComponent from "../reusableComponent/image";
import Typeofduration from "./typeofduration";
import Timeoffstatus from "./timeoffstatus";
import { TimeOffRequestList } from "../reusableComponent/JsonData";
import RowRadioButtons from "../reusableComponent/radiobtn";
import { year } from "../reusableComponent/JsonData";
import DropdownComponent from "../reusableComponent/dropdown";

export default function Requesttimeoff() {
    const [statusHistory, setStatusHistory] = useState<string>("Status");

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
                </div>
                <div className=" col-12 col-md-7  ">
                    <div className="dashboardcard p-3" style={{overflowX:"auto"}}>
                    <div className="d-flex justify-content-between">
                        <p>Time off Status (Self)</p>

                        <DropdownComponent dropdownlist={year} isYear={true} />
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

;
