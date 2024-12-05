import React from "react";
import Image from "next/image";
import { Colors } from "@/app/reusableComponent/styles";
import totalholidays from "@/app/assets/img/totalholidays.svg";
import balanceholidays from "@/app/assets/img/balanceholidays.svg";
import balancecl from "@/app/assets/img/balancecl.svg";
import balancesl from "@/app/assets/img/balancesl.svg";
import contact from "@/app/assets/img/contact.svg";
import usedholiday from "@/app/assets/img/usedholidays.svg";

function Policyprocedure() {
  const useColors = Colors();

  const arrayList = [
    { holidaysname: "Total Holiday", noofholidays: "32", img: totalholidays },
    { holidaysname: "Used Holiday", noofholidays: "11", img: usedholiday },
    {
      holidaysname: "Balance Holiday",
      noofholidays: "12",
      img: balanceholidays,
    },
    { holidaysname: "Balance CL", noofholidays: "12", img: balancecl },
    { holidaysname: "Balance SL", noofholidays: "08", img: balancesl },
    { holidaysname: "Important contact", noofholidays: "20", img: contact },
  ];

  return (
    <div className="d-flex pt-2  pe-2 justify-content-lg-between justify-content-xxl-start gap-xxl-5 gap-3 flex-wrap">
      {arrayList?.map((list: any, index: number) => {
        return (
          <div key={index} className="d-flex my-2 flex-column ">
            <div className="d-flex gap-2 align-items-center">
              <Image src={list.img} alt="" />
              <h6 className="mb-0 textheader heading2">{list.noofholidays}</h6>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Policyprocedure;
