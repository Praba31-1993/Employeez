import Image from "next/image";
import React from "react";

import user2 from "/assets/img/Group 9244.svg";
import headerImage from "/assets/img/anniversary.svg";
import { Colors } from "@/app/reusableComponent/styles";
import ImageComponent from "@/app/reusableComponent/image";
function Workanniversary() {
  const useColors = Colors();
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <p className="textheader heading2 mb-0"> Work anniversary </p>
        {/* <Image src={headerImage} alt="" /> */}
        <ImageComponent user={"/assets/img/todo.svg"} />
      </div>
      <div>
        <div className="d-flex mt-3 justify-content-between align-items-center pb-2">
          <div className="d-flex align-items-center">
            <div className="userimages">
              {/* <Image className="" src={user||'/assets/img/Ellipse 14.svg'}  */}
              <ImageComponent user={"/assets/img/todo.svg"} />
            </div>
            <div className="ps-2">
              <h5 className="para2 textheader  mb-0 ">David mechkam</h5>
              <p className="shade para2  mb-0 ">HR</p>
            </div>
          </div>
          <p
            className="para2 mb-0 text-center w-20"
            style={{ color: useColors.themeRed }}
          >
            Today
          </p>
        </div>
        <div className="d-flex mt-3 justify-content-between align-items-center pb-2">
          <div className="d-flex align-items-center">
            <div className="userimages">
              {/* <Image className="" src={user2} alt={""} /> */}
              <ImageComponent user={"/assets/img/todo.svg"} />
            </div>
            <div className="ps-2">
              <h5 className="para2 textheader  mb-0 ">David mechkam</h5>
              <p className="shade para2  mb-0 ">HR</p>
            </div>
          </div>
          <p
            className="para2 mb-0 text-center w-20"
            style={{ color: useColors.themeRed }}
          >
            Tomorrow
          </p>
        </div>
      </div>
    </>
  );
}

export default Workanniversary;
