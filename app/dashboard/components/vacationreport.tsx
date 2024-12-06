import Image from "next/image";
import React from "react";
import user from "@/app/assets/img/Ellipse 14.svg";
import user2 from "@/app/assets/img/user2.svg";
import headerImage from "@/app/assets/img/Vacation.svg";
import { Colors } from "@/app/reusableComponent/styles";
function Vacationreport() {
    const useColors = Colors();
  return (
    <>
            <div className="d-flex justify-content-between align-items-center">
                <p className="textheader heading2 mb-0">Vacation report</p>
                <Image src={headerImage} alt="" />
            </div><div>
                <div className="d-flex mt-3 justify-content-between align-items-center pb-2">
                    <div className="d-flex align-items-center">
                        <div className="userimages">
                            <Image className="" src={user} alt={""} />
                        </div>
                        <div  className="ps-2">
                            <h5 className="para2 textheader  mb-0 ">David mechkam</h5>
                            <p className="shade para2  mb-0 ">HR</p>
                        </div>
                    </div>
                    <p className="para2 mb-0 text-center w-20" style={{ color: useColors.themeRed }}>Today</p>
                </div>
                <div className="d-flex mt-3 justify-content-between align-items-center pb-2">
                    <div className="d-flex align-items-center">
                        <div className="userimages">
                            <Image className="" src={user2} alt={""} />
                        </div>
                        <div  className="ps-2">
                            <h5 className="para2 textheader  mb-0 ">David mechkam</h5>
                            <p className="shade para2  mb-0 ">HR</p>
                        </div>
                    </div>
                    <p className="para2 mb-0 text-center w-20" style={{ color: useColors.themeRed }}>Tomorrow</p>
                </div>
                <div className="d-flex mt-3 justify-content-between align-items-center pb-2">
                    <div className="d-flex align-items-center">
                        <div className="userimages">
                            <Image className="" src={user} alt={""} />
                        </div>
                        <div  className="ps-2">
                            <h5 className="para2 textheader  mb-0 ">David mechkam</h5>
                            <p className="shade para2  mb-0 ">HR</p>
                        </div>
                    </div>
                    <p className="para2 mb-0 text-center w-20" style={{ color: useColors.themeRed }}>Today</p>
                </div>
            </div>
        </>
  )
}

export default Vacationreport
