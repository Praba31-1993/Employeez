import React from "react";
import ToDoIcon from "@/app/assets/img/todo.svg";
import Image from "next/image";

interface HrdatasProps {
  hrList: any;
  isPendingHrData: boolean;
}
function Hrdatas({ hrList, isPendingHrData }: HrdatasProps) {
  return (
    <div>
      {isPendingHrData ? (
        <div className="d-flex align-items-center mb-1">
        <Image src={ToDoIcon} alt="" />

        <div>
          {/* <h5 className="para ps-2 mb-0 ">{hrList?.counts}</h5> */}
          <p className="shade para ps-2 mb-0 ">{hrList?.label}</p>
        </div>
      </div>
      ) : (
        <div className="dashboardcard p-3 d-flex align-items-center mb-3">
          <Image src={ToDoIcon} alt="" />

          <div>
            <h5 className="para ps-2 mb-0 ">{hrList?.counts}</h5>
            <p className="shade para2 ps-2 mb-0 ">{hrList?.label}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hrdatas;
