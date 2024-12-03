import Image from "next/image";
import React from "react";
import Avatar from "@mui/material/Avatar";
import ClickableChips from "./chips";

interface MenulistforbirthdayworkvacationProps {
  headerImage: any;
  title:string;
  items:any
}
function Menulistforbirthdayworkvacation({
  headerImage,
  title,
  items
}: MenulistforbirthdayworkvacationProps) {
 
  return (
    <div>
      <div className="d-flex justify-content-between ">
        <p className="textheader heading2">{title}</p>

        <Image src={headerImage} alt="" style={{ marginTop: "-30px" }} />
      </div>
      <div>
        {items?.map((bday: any) => (
          <div className="d-flex justify-content-between align-items-center pb-2">
            <div className="d-flex align-items-center">
              <Avatar src="" alt="Remy Sharp" />
              <div>
                <h5 className="para ps-2 mb-0 ">{bday?.name}</h5>
                <p className="shade para2 ps-2 mb-0 ">{bday?.role}</p>
              </div>
            </div>
            <p className="para2 mb-0 text-start w-20">{bday?.day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menulistforbirthdayworkvacation;
