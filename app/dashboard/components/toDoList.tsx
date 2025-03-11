"use client";
import React, { useState, useEffect } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../dashboard.css";
import { Colors } from "../../reusableComponent/styles";
import ImageComponent from "@/app/reusableComponent/image";



function ToDoList() {
  const useColors = Colors();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetch
    const timer = setTimeout(() => setLoading(false), 2000); // Adjust the timeout as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h4 className="textheader heading2 fw-bold">To do list</h4>

      {loading
        ? // Skeleton loader while data is loading
          Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="d-flex align-items-start mt-3 p-1 todoList"
              >
                <Skeleton
                  circle={true}
                  height={40}
                  width={40}
                  className="me-2"
                />
                <div className="ps-2 w-100">
                  <Skeleton height={20} width="80%" className="mb-1" />
                  <div className="row w-100 mt-1 m-0">
                    <div className="col-6 px-0">
                      <Skeleton height={16} width="70%" />
                    </div>
                    <div className="col-6 px-0">
                      <Skeleton height={16} width="70%" />
                    </div>
                  </div>
                </div>
              </div>
            ))
        : // Render actual content after loading
          [0, 1, 2].map((value, index) => (
            <div key={index}>
              {/* <div className="d-flex align-items-start mt-3 p-1 todoList">
                <ImageComponent
                  width={40}
                  height={40}
                  user={"/assets/img/todo.svg"}
                />
                <div className="ps-2 w-100">
                  <p className="para textheader mb-0 ellipsis-applied">
                    I-9 for contractor Alpha (AP001) has been due{" "}
                  </p>
                  <div className="row w-100 mt-1 m-0">
                    <div className="col-6 px-0">
                      <p className="para2 unselectcolor">
                        <CalendarMonthIcon sx={{ fontSize: "12px" }} />{" "}
                        2024-10-05{" "}
                      </p>
                    </div>
                    <div className="col-6 px-0">
                      <p
                        className="para2"
                        style={{ color: useColors.themeRed }}
                      >
                        <HourglassBottomIcon sx={{ fontSize: "12px" }} />{" "}
                        2024-10-05{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          ))}
    </div>
  );
}

export default ToDoList;
