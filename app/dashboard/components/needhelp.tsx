import React from "react";
import Image from "next/image";
import Outlinebutton from "../../reusableComponent/outlinebtn";
import { Colors } from "@/app/reusableComponent/styles";
import help from "/assets/img/help.svg";
import ImageComponent from "@/app/reusableComponent/image";

function Needhelp() {
  const useColors = Colors();
  return (
    <>
      <div className="d-flex justify-content-between ">
        <p className="textheader heading2">Need help?</p>

        {/* <Image src={help} alt="" /> */}
        <ImageComponent width={0}  height={0} user={"/assets/img/help.svg"} />
      </div>
      <p className="para shade">
        Do you face any problem while using EmployEz?
      </p>
      <Outlinebutton
        color={useColors.white}
        border={`1px solid ${useColors.themeRed}`}
        text="Contact us"
        fontSize="12px"
        background={useColors.themeRed}
        
        iscontactus={true}
      />
    </>
  );
}

export default Needhelp;
