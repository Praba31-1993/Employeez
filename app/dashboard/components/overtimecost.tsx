import Image from "next/image";
import React from "react";

import { Colors } from "../../reusableComponent/styles";
import ImageComponent from "@/app/reusableComponent/image";

interface OverTimeCostProps {
  headerImage?: any;
  title: string;
  items: any;
  isSalesReport?: boolean;
  lastmonthReport?: string;
}

function OverTimeCost({ title, items }: OverTimeCostProps) {
  const useColors = Colors();
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <p className="textheader heading2 mb-0">{title} </p>
      </div>
      <div>
        {items?.map((bday: any, index: number) => (
          <div key={index}>
            <div className="d-flex mt-3 justify-content-between align-items-center pb-2">
              <div className="d-flex align-items-center">
                <div className="userimages">
                  {/* <Image className="" src={user||'/assets/img/Ellipse 14.svg'} alt={""} />  */}
                  <ImageComponent width={0}  height={0} user={"/assets/img/openjobs.svg"} />
                </div>
                <div className="ps-2">
                  <h5 className="para2 textheader  mb-0 ">{bday?.name}</h5>
                  <p className="shade para2  mb-0 ">
                    $1000 <span>Approved</span>
                  </p>
                </div>
              </div>
              <p
                className="para2 mb-0 text-center w-20"
                style={{ color: useColors.themeRed }}
              >
                {bday?.day}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OverTimeCost;
