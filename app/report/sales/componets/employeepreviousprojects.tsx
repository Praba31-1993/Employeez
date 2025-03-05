import Image from "next/image";
import React from "react";
import user from "@/public/assets/img/Ellipse 14.svg";
import '../salesReport.css'


function EmployeePreviousProjects({ detail }: any) {

  return (
    <div className="row">
      <div className="col-lg-7 col-12 mb-3">
        <div className="mb-1 gap-3 d-flex align-items-center">
          <div className="" style={{ width: "80px", height: "80px" }}>
            <Image
              className="w-100 h-100 rounded-circle"
              style={{ objectFit: "cover" }}
              src={user}
              alt={""}
            />
          </div>
          <div className="">
            <p className="mb-0 heading2 dropdowncolor">
              {detail?.empName} ({detail?.empId})
            </p>
            <p className="mb-0 para shade">Employee</p>
            <p className="mb-0 para shade">joined at : 12/01/2010</p>
          </div>
        </div>
      </div>
      <div className="col-lg-5 col-12 ">
        <div>
          <p className="mb-0 heading2 dropdowncolor">Current rate : $95/hr</p>
          <p className="mb-0 para shade">Total experience: 8 Years</p>
          <p className="mb-0 para shade">Department: Sales</p>
        </div>
      </div>

      <div className="col-12">
        <p className="mb-1 heading2 dropdowncolor">Primary Skills</p>
        <div className="">
          <div className="div d-flex gap-3">
            {["a", "b"].map((skill: any,index:any) => (
              <div key={index}>
              <p className="skillsetCardstyle mb-0">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeePreviousProjects;
