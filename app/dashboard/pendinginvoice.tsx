import React from "react";
import DropdownComponent from "../reusableComponent/dropdown";
import InvoiceChartIcon from "@/app/assets/img/invoicechart.svg";
import Image from "next/image";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
function Pendinginvoice() {
  return (
    <div className="w-100">
      <div className="d-flex justify-content-around">
        <ListItem>
          <ListItemText primary="Pending invoices" />
        </ListItem>
        <div style={{ marginTop: "-16px" }}>
          <DropdownComponent />
        </div>
      </div>

      <div className="d-flex justify-content-around">
        <Image src={InvoiceChartIcon} alt="chart" width={90} />
        <div style={{ marginTop: "0px" }}>
          <div>
            <div className="row">
              <div className="col-6">
                <div className="d-flex">
                  <FiberManualRecordIcon sx={{ fill: "blue" }} /> <p>Weekly</p>
                </div>
                <div>12</div>
              </div>
              <div className="col-6">
                <div className="d-flex">
                  <FiberManualRecordIcon sx={{ fill: "blue" }} /> <p>Weekly</p>
                </div>
                <div>12</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="d-flex">
                  <FiberManualRecordIcon sx={{ fill: "blue" }} /> <p>Weekly</p>
                </div>
                <div>12</div>
              </div>
              <div className="col-6">
                <div className="d-flex">
                  <FiberManualRecordIcon sx={{ fill: "blue" }} /> <p>Weekly</p>
                </div>
                <div>12</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pendinginvoice;
