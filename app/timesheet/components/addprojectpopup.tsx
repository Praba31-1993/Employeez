"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Commoncheckbox } from "@/app/reusableComponent/textboxes";
import Outlinebutton from "@/app/reusableComponent/outlinebtn";
import { TimesheetExpenceAndHoursField } from "@/app/reusableComponent/timesheetexpenceandhoursfield";

export function Addprojectpopup({
    show,
    close,
    projectLists,
    unSelectedProjectedData,
}: any) {
    const [selectedProjects, setSelectedProjects] = React.useState<
        { projectid: string; projectname: string }[]
    >([]);

    const AssinedProjectlist = [
        { projectname: "Company1", projectid: "1" },
        { projectname: "Company2", projectid: "2" },
        { projectname: "Project 1", projectid: "3" },
    ];

    const handleCheckboxChange = (
        project: { projectid: string; projectname: string },
        isChecked: boolean
    ) => {
        setSelectedProjects((prev) =>
            isChecked
                ? [...prev, project]
                : prev.filter((p) => p.projectid !== project.projectid)
        );
    };

    const handleSave = () => {
        projectLists(selectedProjects);
        close();
    };

    return (
        <>
            <TimesheetExpenceAndHoursField />
            <section className={`showpopup ${show ? "showpopupactive" : ""}`}  onClick={close}>
                <div
                    className="summarysection  mx-auto"
                    style={{
                        height: "fit-content",
                        alignSelf: "center",
                        width: "400px",
                        overflowY: "auto",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="container-fluid">
                        <div className="row px-2">
                            <div className="col-12">
                                <div className="summary py-1 d-flex justify-content-between align-items-center">
                                    <h5 className="heading2 me-3 textheader mb-0">
                                        Add projects
                                    </h5>
                                    <FontAwesomeIcon style={{ cursor: "pointer" }}
                                        className="my-2 textheader"
                                        icon={faXmark}
                                        onClick={close}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3 px-2">
                            <div
                                className="col-12"
                                style={{ height: "30vw", overflowY: "auto" }}
                            >
                                {unSelectedProjectedData?.map((project: any, index: number) => (
                                    <div key={index} className="pb-2">
                                        <Commoncheckbox
                                            selectdata={project}
                                            onChange={(isChecked: boolean) =>
                                                handleCheckboxChange(project, isChecked)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="col-12 mb-3 d-flex justify-content-end mt-4">
                                <div className="ms-3">
                                    <Outlinebutton
                                        color="#808080"
                                        border="1px solid #808080"
                                        text="Cancel"
                                        fontSize="12px"
                                        background="transparent"
                                        onClick={close}
                                        variant={"outlined"}

                                    />
                                </div>
                                <div className="ms-3">
                                    <Outlinebutton
                                        color="#FFF"
                                        border="1px solid #FF6F6F"
                                        text="Save"
                                        fontSize="12px"
                                        background="#FF6F6F"
                                        onClick={handleSave}
                                        variant={"outlined"}

                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
