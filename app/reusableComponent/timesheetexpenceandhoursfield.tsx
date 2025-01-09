"use client";
import { Colors } from "./styles";
import React, { useState } from "react";
import "./stylessheetforreusablecomponent.css";

export function TimesheetExpenceAndHoursField({
    text,
    timesheetData,
    weekListDataList,
    calendardatas
}: any) {
    const useColors = Colors();

    const [values, setValues] = useState<string[]>(Array(7).fill("")); // Store input values as strings
    const [total, setTotal] = useState<number>(0); // Store the total for the week

    const handleInputChange = (index: number, value: string) => {
        const updatedValues = [...values];
        updatedValues[index] = value;
        setValues(updatedValues);

        // Parse values as numbers and calculate total
        const newTotal = updatedValues.reduce(
            (sum, val) => sum + (parseFloat(val) || 0),
            0
        );
        setTotal(newTotal);
    };

    return (
        <>


            <div
                className={`timesheetlist ${text === "Holiday" ? "holiday" : ""
                    } mb-1 align-items-center py-2`}
            >
                <div className="d-flex">
                    <h5 className="projectlist para ms-3 mb-0 bg-transparent">{text}</h5>
                </div>
                {weekListDataList?.length > 0 ? (
                    <div className="d-flex align-items-end px-3 mt-2 inputfield">
                        {weekListDataList.map((weeklist: any, index: number) => (
                            <div
                                className="pe-1 inputdats position-relative"
                                key={`${weeklist.date}-${index}`}
                            >
                                <div className="input-icon-wrapper">
                                    <input
                                        type="number"
                                        className="py-sm-3 py-2 px-2 with-icon"
                                        value={values[index]}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        disabled={text === "LOP" || text === "PTO/EL"}
                                    />
                                </div>
                            </div>
                        ))}

                        <div className="pe-1 inputdats ms-2">
                            {/* <p className="para2 mb-1 text-center" style={{ color: "red" }}>
              Week Total
            </p> */}
                            <input type="text" className="py-sm-3 py-2 px-2" value={total} readOnly />
                        </div>
                    </div>
                ) : (
                    <div className="d-flex align-items-end px-3 mt-2 inputfield">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                            (day, index) => (
                                <div className="pe-1 inputdats position-relative" key={index}>

                                    <div className="input-icon-wrapper">
                                        <input
                                            type="number"
                                            className="py-3 px-2 with-icon"
                                            value={values[index]}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            disabled={text === "LOP" || text === "PTO/EL"}

                                        />
                                    </div>
                                </div>
                            )
                        )}
                        <div className="pe-1 inputdats ms-2">

                            <input type="text" className="py-3 px-2" value={total} readOnly />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
{/* <p className="para2 mb-1 textheader text-center">
                {weeklist?.monthDay} {weeklist?.day}
              </p> */}
//   <p className="para2 mb-1 text-center" style={{ color: "red" }}>
//   Week Total
// </p>