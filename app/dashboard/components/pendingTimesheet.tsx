"use client";
import React from "react";
import ToDoIcon from "/assets/img/todo.svg";
import Image from "next/image";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import "../dashboard.css";
import { Colors } from "../../reusableComponent/styles";
import { Avatar } from "@mui/material";

interface PendingTimeSheetProps {
  title: string;
}
function PendingTimeSheet({ title }: PendingTimeSheetProps) {
  const useColors = Colors();
  return (
    <div>
      <div className="fw-bold">{title}</div>

      {[0, 1, 2].map((value, index) => {
        return (
          <div key={index}>
            <div className="d-flex align-items-start mt-3 p-1">
              <Avatar src="" alt="Remy Sharp" />

              <div className="ps-1 w-100">
                <p className="para textheader mb-0 ellipsis-applied">
                  I-9 for contractor Alpha (AP001) has been due{" "}
                </p>
                <div className="row w-50 mt-1 m-0">
                  <div className="col-8 px-0">
                    <p className="para2 " style={{ color: useColors.themeRed }}>
                      {" "}
                      <HourglassBottomIcon sx={{ fontSize: "12px" }} />{" "}
                      2024-10-05{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PendingTimeSheet;
