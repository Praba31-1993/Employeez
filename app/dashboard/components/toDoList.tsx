"use client";
import React from "react";
import ToDoIcon from "/assets/img/todo.svg";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import "../dashboard.css";
import { Colors } from "../../reusableComponent/styles";
import ImageComponent from "@/app/reusableComponent/image";

interface ToDoListProps {
  title: string;
}
function ToDoList({ title }: ToDoListProps) {
  const useColors = Colors();
  return (
    <div>
      <h4 className="textheader heading2">To do list</h4>

      {[0, 1, 2,].map((value, index) => {
        return (
          <div key={index}>
            <div className="d-flex align-items-start mt-3 p-1 todoList">
              {/* <Image src={ToDoIcon} alt="" /> */}
              <ImageComponent width={0}  height={0} user={"/assets/img/todo.svg"}/>
              <div className="ps-2 w-100">
                <p className="para textheader mb-0 ellipsis-applied">
                  I-9 for contractor Alpha (AP001) has been due{" "}
                </p>
                <div className="row w-100 mt-1 m-0">
                  <div className="col-6 px-0">
                    <p className="para2 unselectcolor">
                      {" "}
                      <CalendarMonthIcon
                        sx={{ fontSize: "12px" }}
                      /> 2024-10-05{" "}
                    </p>
                  </div>
                  <div className="col-6 px-0">
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

export default ToDoList;
