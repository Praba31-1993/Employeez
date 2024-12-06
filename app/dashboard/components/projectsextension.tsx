import Image from "next/image";
import React from "react";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import { Colors } from "@/app/reusableComponent/styles";
function ProjectExtension() {
    const useColors = Colors();
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <p className="textheader heading2 mb-0"> Project extension</p>
            </div><div>
                <div className="d-flex mt-3 justify-content-between align-items-center pb-2">
                    <div className="d-flex ">
                        <div className="headingicons rounded-circle" style={{ background: useColors.themeRed, height: "fit-content", width: "fit-content" }}>
                            <CategoryRoundedIcon className="m-1 text-white" />
                        </div>
                        <div className="ps-2">
                            <h5 className="para2 textheader mb-0 ">Project 1</h5>
                            <p className="shade para2 mb-0 ">Imran development project </p>
                           <p className="para2 mb-0  d-flex align-items-center" style={{ color: useColors.themeRed }}> <HourglassBottomIcon className="pe-2 " /> 10/11/2024</p>
                        </div>
                    </div>

                </div>
                <div className="d-flex mt-3 justify-content-between align-items-center pb-2">
                    <div className="d-flex ">
                        <div className="headingicons rounded-circle" style={{ background: useColors.themeRed, height: "fit-content", width: "fit-content" }}>
                            <CategoryRoundedIcon className="m-1 text-white" />
                        </div>
                        <div className="ps-2">
                            <h5 className="para2 textheader  mb-0 ">Project 1</h5>
                            <p className="shade para2  mb-0 ">Imran development project </p>
                            <p className="para2 mb-0  d-flex align-items-center" style={{ color: useColors.themeRed }}> <HourglassBottomIcon className="pe-2 " /> 10/11/2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectExtension
