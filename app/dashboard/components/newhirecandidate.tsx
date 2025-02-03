import Image from "next/image";
import React from "react";
import { Colors } from "../../reusableComponent/styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ImageComponent from "@/app/reusableComponent/image";
import user  from "@/public/assets/img/Ellipse 14.svg";
interface MenulistforbirthdayworkvacationProps {
  headerImage: any;
  title: string;
  items: any;
  isSalesReport?: boolean;
  lastmonthReport?: string;
}
function NewHireCandidate({
  headerImage,
  title,
  items,
  isSalesReport,
}: MenulistforbirthdayworkvacationProps) {
  const useColors = Colors();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <p className="textheader heading2 mb-0">{title} </p>
      </div>
      <div>
        {items?.map((bday: any, index:number) => (
          <div key={index}>
          <div className="d-flex mt-3 justify-content-between align-items-center pb-2">
            <div className="d-flex align-items-center">
                <Image className="" src={user||'/assets/img/Ellipse 14.svg'} alt={""} />
                {/* <ImageComponent width={0}  height={0} user={"/assets/img/Ellipse 14.svg"}/> */}

              <div>
                <h5 className="para2 textheader ps-1 mb-0 ">{bday?.name}</h5>
                <p className="shade para2 ps-2 mb-0 ">
                  {bday?.role}

                </p>
                <p className="shade para2 ps-2 mb-0 ">
                  2024-12-05

                </p>
              </div>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewHireCandidate;
