import React from "react";
import ImageComponent from "../reusableComponent/image";
import Typeofduration from "./typeofduration";
import Timeoffstatus from "./timeoffstatus";
import { TimeOffRequestList } from "../reusableComponent/JsonData";

function Requesttimeoff() {
  return (
    <div>
      <div className="d-flex gap-3 flex-wrap">
        {TimeOffRequestList.map((timeoffrequest: any) => (
          <div
            key={timeoffrequest?.id}
            className="dashboardcard d-flex  flex-column w-40 h-30 p-2 "
          >
            <div className="d-flex gap-2 align-items-center">
              <ImageComponent width={0} height={0} user={""} />
              <h6 className="mb-0 textheader heading2">
                {timeoffrequest?.count}
              </h6>
            </div>
            <p className="para pt-2  mb-0 shade">
              {timeoffrequest?.name} ({timeoffrequest?.hrs})
            </p>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="row">
        <div className="col-12 col-md-6">
          <Typeofduration />
        </div>
        <div className="col-12 col-md-6">
          <Timeoffstatus />
        </div>
      </div>
    </div>
  );
}

export default Requesttimeoff;
