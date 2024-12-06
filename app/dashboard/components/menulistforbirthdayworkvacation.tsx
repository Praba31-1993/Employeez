import Image from "next/image";
import React from "react";
import Avatar from "@mui/material/Avatar";
import ClickableChips from "../../reusableComponent/chips";
import user from "@/app/assets/img/Ellipse 14.svg";
import { Colors } from "../../reusableComponent/styles";

interface MenulistforbirthdayworkvacationProps {
  headerImage: any;
  title: string;
  items: any;
  isSalesReport?: boolean;
  lastmonthReport?: string;
}

function Menulistforbirthdayworkvacation({
  headerImage,
  title,
  items,
  isSalesReport,
  lastmonthReport,
}: MenulistforbirthdayworkvacationProps) {
    const useColors = Colors();
    return (
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <p className="textheader heading2 mb-0">{title} </p>
    
                    {!isSalesReport && (
                        <Image src={headerImage} alt="" />
                    )}
                </div>
                <div>
                    {items?.map((bday: any, index:number)  => (
                        <div key={index}>
                        <div className="d-flex mt-3 justify-content-between align-items-center pb-2">
                            <div className="d-flex align-items-center">
                            <div className="userimages">
                              <Image className="" src={user} alt={""} />
                              </div>
                                <div className="ps-2">
                                    <h5 className="para2 textheader  mb-0 ">{bday?.name}</h5>
                                    <p className="shade para2  mb-0 ">
                                        {isSalesReport ? bday?.sales : bday?.role}
                                    </p>
                                </div>
                            </div>
                            <p className="para2 mb-0 text-center w-20"  style={{ color: useColors.themeRed }} >{bday?.day}</p>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        );
}

export default Menulistforbirthdayworkvacation;
