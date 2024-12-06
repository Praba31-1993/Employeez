import Image from "next/image";
import React from "react";
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import headerImage from "@/app/assets/img/openjobs.svg";
import { Colors } from "@/app/reusableComponent/styles";
function Openjobs() {
    const useColors = Colors();
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <p className="textheader heading2 mb-0"> Open jobs</p>
                <Image src={headerImage} alt="" />
            </div><div>
                <div className="d-flex mt-3 justify-content-between align-items-center pb-2">
                    <div className="d-flex ">
                        <div className="headingicons rounded-circle" style={{ background: "#8F88FF", height: "fit-content", width: "fit-content" }}>
                            <WorkOutlineRoundedIcon className="m-1 text-white" />
                        </div>
                        <div className="ps-2">
                            <h5 className="para2 textheader mb-0 ">General manager, southfield</h5>
                           <p className="para2 mb-0 shade d-flex align-items-center"> <CalendarMonthRoundedIcon className="pe-2 " /> 10/11/2024</p>
                        </div>
                    </div>

                </div>
                <div className="d-flex mt-3 justify-content-between align-items-center pb-2">
                    <div className="d-flex ">
                        <div className="headingicons rounded-circle" style={{ background: "#8F88FF", height: "fit-content", width: "fit-content" }}>
                            <WorkOutlineRoundedIcon className="m-1 text-white" />
                        </div>
                        <div className="ps-2">
                            <h5 className="para2 textheader  mb-0 ">General manager, southfield</h5>
                            <p className="para2 mb-0 shade d-flex align-items-center"> <CalendarMonthRoundedIcon className="pe-2 " /> 10/11/2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Openjobs
