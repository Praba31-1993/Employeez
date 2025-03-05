import React from "react";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import Image from "next/image";
import profilepicture from "@/public/assets/img/profilepic.svg";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Basicinfo = ({ employeeDetails }: any) => {
  return (
    <div
      className="accordion dashboardcard mb-2 accordion-flush "
      id="accordionFlushExample"
    >
      <div className="accordion-item">
        <h2 className="accordion-header py-2 px-3" id="flush-headingOne">
          <button
            className="accordion-button  p-0 unselectcolor heding2 collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            <PermContactCalendarOutlinedIcon className="me-2" /> Basic info
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          className="accordion-collapse show accordionCollapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body py-2  ">
            <div className="row">
              <div className="col-12 mb-2">
                <div className="profilepicture">
                  <div
                    className="Profileimg"
                    style={{ height: "6vw", width: "17%" }}
                  >
                    <Image
                      className="w-100 h-100 rounded"
                      src={profilepicture}
                      style={{ objectFit: "cover" }}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-2 ">
                <h5 className="para2 shade">First Name</h5>
                <h3 className="para textheader">
                  {employeeDetails?.employeename}
                </h3>
              </div>
              <div className="col-md-4 mb-2 ">
                <h5 className="para2 shade">Last Name</h5>
                <h3 className="para textheader">Kumar</h3>
              </div>
              <div className="col-md-4 mb-2 ">
                <h5 className="para2 shade">Date of birth</h5>
                <h3 className="para textheader">27-03-1999</h3>
              </div>
              <div className="col-md-4 mb-2 ">
                <h5 className="para2 shade">Mobile no </h5>
                <h3 className="para textheader">{employeeDetails?.mobile}</h3>
              </div>
              <div className="col-md-4 mb-2 ">
                <h5 className="para2 shade">Gender</h5>
                <h3 className="para textheader">Male</h3>
              </div>
              <div className="col-md-4 mb-2 ">
                <h5 className="para2 shade">Blood group</h5>
                <h3 className="para textheader">B+</h3>
              </div>
              <div className="col-md-4 mb-2 ">
                <h5 className="para2 shade">Ethnicity</h5>
                <h3 className="para textheader">South Asian</h3>
              </div>
              <div className="col-md-4 mb-2 ">
                <h5 className="para2 shade">Martial status</h5>
                <h3 className="para textheader">Single</h3>
              </div>
              <div className="col-12 mb-2 ">
                <h3 className="heading2 textheader">Address</h3>
              </div>
              <div className="col-md-4 mb-2 ">
                <h5 className="para2 shade">Suite no/street</h5>
                <h3 className="para textheader">No: 06</h3>
              </div>
              <div className="col-md-4 mb-2 ">
                <h5 className="para2 shade">State</h5>
                <h3 className="para textheader">Washington</h3>
              </div>
              <div className="col-md-4 mb-2 ">
                <h5 className="para2 shade">City</h5>
                <h3 className="para textheader">Washington</h3>
              </div>
              <div className="col-md-4 mb-2 ">
                <h5 className="para2 shade">Country</h5>
                <h3 className="para textheader">United states</h3>
              </div>
              <div className="col-md-4 mb-2 ">
                <h5 className="para2 shade">Postal code</h5>
                <h3 className="para textheader">532518</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basicinfo;
