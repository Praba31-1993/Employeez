import Image from "next/image";
import React from "react";
import user from "@/app/assets/img/Ellipse 14.svg";
import user2 from "@/app/assets/img/user2.svg";
import { Colors } from "@/app/reusableComponent/styles";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

function Inineverify() {
    const useColors = Colors();
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <p className="textheader heading2 mb-0">I-9 Verify</p>
            </div><div>
                <div className="d-flex mt-3 justify-content-between align-items-center pb-2">
                    <div className="d-flex align-items-center">
                        <div className="userimages">
                            <Image className="" src={user} alt={""} />
                        </div>
                        <div className="ps-2">
                            <h5 className="para2 textheader  mb-0 ">David mechkam</h5>
                            <p className="shade para2  mb-0 ">HR</p>
                        </div>
                    </div>
                    <p className="para2 mb-0 text-center d-flex align-items-center w-20" style={{ color: useColors.themeRed }}> <HourglassBottomIcon className="pe-1 " /> 10/11/2024</p>
                </div>
                <div className="d-flex mt-3 justify-content-between align-items-center pb-2">
                    <div className="d-flex align-items-center">
                        <div className="userimages">
                            <Image className="" src={user2} alt={""} />
                        </div>
                        <div className="ps-2">
                            <h5 className="para2 textheader  mb-0 ">David mechkam</h5>
                            <p className="shade para2  mb-0 ">HR</p>
                        </div>
                    </div>
                    <p className="para2 mb-0 text-center d-flex align-items-center w-20" style={{ color: useColors.themeRed }}> <HourglassBottomIcon className="pe-1 " /> 10/11/2024</p>
                </div>
            </div>
        </>
    )
}

export default Inineverify
