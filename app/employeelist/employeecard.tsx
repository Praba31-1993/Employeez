import { Chip } from "@mui/material";
import React from "react";
import user from "@/public/assets/img/Ellipse 14.svg";
import Image from "next/image";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

function EmployeeCard({ employeelist }: any) {
  return (
    <div className="dashboardcard p-3">
      <div className="row">
        <div className="col-12">
          <Chip
            label={
              employeelist?.status
                ? employeelist.status.charAt(0).toUpperCase() +
                  employeelist.status.slice(1)
                : ""
            }
            sx={{
              color: employeelist?.status === "active" ? "#14E002" : "#FF4C51",
              background:
                employeelist?.status === "active"
                  ? "rgba(86, 202, 0, 0.16)"
                  : "#F7DADB",
            }}
          />
        </div>

        <div className="col-12 p-0 mb-3">
          <div className="d-flex justify-content-center flex-column align-items-center">
            <div className="mb-1" style={{ width: "80px", height: "80px" }}>
              <Image className="w-100 h-100" src={user} alt={""} />
            </div>

            <div>
              <h5 className="heading2 textheader ps-2 mb-1 text-center">
                {employeelist?.name + " "}({employeelist?.employeeId})
              </h5>
              <p className="para ps-2 mb-3 mt-1 shade text-center">
                {employeelist?.role}
              </p>
            </div>
          </div>
        </div>

        <div className="col-6 mb-3">
          <div className="d-flex align-items-center">
            <ApartmentOutlinedIcon sx={{ color: "#6d6777" }} />
            <p className="para ps-2 mb-0 unselectcolor">
              {employeelist?.department}
            </p>
          </div>
        </div>
        <div className="col-6 mb-3">
          <div className="d-flex align-items-center">
            <ManageAccountsOutlinedIcon sx={{ color: "#6d6777" }} />
            <p className="para ps-2 mb-0 unselectcolor">
              {employeelist?.manager}
            </p>
          </div>
        </div>
        <div className="col-6 mb-3">
          <div className="d-flex align-items-center">
            <CallOutlinedIcon sx={{ color: "#6d6777" }} />
            <p className="para ps-2 mb-0 unselectcolor">
              {employeelist?.mobile_number}
            </p>
          </div>
        </div>
        <div className="col-6 mb-3">
          <div className="d-flex align-items-center">
            <MailOutlineOutlinedIcon sx={{ color: "#6d6777" }} />
            <p className="para ps-2 mb-0 unselectcolor">
              {employeelist?.email}
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex align-items-center">
            <p className="mb-0">Joined at</p>
            <p className="para ps-2 mt-1 mb-0 unselectcolor">
              {employeelist?.joined_date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
