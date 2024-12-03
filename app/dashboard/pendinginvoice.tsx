import React from "react";
import DropdownComponent from "../reusableComponent/dropdown";
import InvoiceChartIcon from "@/app/assets/img/invoicechart.svg";
import Image from "next/image";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "./dashboard.css";
import { TextStyles } from "../reusableComponent/styles";
import Circle from "../reusableComponent/circle";

function Pendinginvoice() {
  return (
    <div className="p-3">
      <div className="d-flex justify-content-between ">
        <p className="textheader heading2">Pending Invoices</p>

        <select
          className="form-select form-select-lg mb-3
          cursorPointer para2
          "
          aria-label=".form-select-lg example"
          style={{ width: "fit-content" }}
        >
          <option selected>Select</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div className="row para pr-5">
        <div className="col-sm-12 col-md-6">
          <Image src={InvoiceChartIcon} alt="chart" />
        </div>
        <div className="col-sm-12 col-md-6 " style={{ margin: "10% auto" }}>
          {[1, 2].map((list, index, array) => (
            <div
              key={index}
              className={`d-flex justify-content-between gap-3 ${
                index === array.length - 1 ? "mt-5" : ""
              }`}
            >
              <div className="d-flex align-items-start gap-2">
                <Circle />
                <div style={{ marginTop: "-7px" }}>
                  <p className="mb-0">Weekly</p>
                  <p className="mb-0">12</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-2">
                <Circle />
                <div style={{ marginTop: "-7px" }}>
                  <p className="mb-0">Weekly</p>
                  <p className="mb-0">12</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pendinginvoice;
