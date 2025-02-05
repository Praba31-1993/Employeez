"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";
import DataGridDemo from "@/app/reusableComponent/table";
import { GridColDef } from "@mui/x-data-grid";

export function Idetails({ show, close, customsheetlist }: any) {
    const columns: GridColDef[] = [
        
        {
            field: 'date',
            headerName: 'Date',
            width: 200,
            editable: true,
        },
        {
            field: 'projectName',
            headerName: 'Project Name',
            width: 200,
            editable: true,
        },
        {
            field: 'hours',
            headerName: 'Hours',
            type: 'number',
            width: 200,
            editable: true,
        },
        {
            field: 'comments',
            headerName: 'Comments',
            type: 'number',
            width: 260,
            editable: true,
        },
      
    ];
    return (
        <section className={`showpopup ${show ? "showpopupactive" : ""}`}  onClick={close}>
            <div className="summarysection" onClick={(e) => e.stopPropagation()}>
                <div className="container-fluid">
                    <div className="row px-2 summary">
                        <div className="col-12">
                            <div className="py-1 d-flex justify-content-between align-items-center">
                                <div className="approverlist align-items-center d-flex mt-2">
                                    <Avatar src='' />
                                    <div className="roles">
                                        <h5 className="para ps-2 mb-0">Timesheet approver</h5>
                                        <p className="para2 ps-2 mb-0 mt-1 shade">Timesheet approver</p>
                                    </div>
                                </div>
                                <FontAwesomeIcon style={{cursor:"pointer"}}
                                    className="my-2 textheader"
                                    icon={faXmark}
                                    onClick={close}
                                />
                            </div>
                        </div>
                        <div className="col-12 py-2">
                            <h5 className="heading2 textheader mb-0">Custom timesheet details</h5>
                        </div>
                    </div>
                    <div className="row mt-3 px-2">
                        <div className="col-12">
                            <DataGridDemo rows={customsheetlist} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
