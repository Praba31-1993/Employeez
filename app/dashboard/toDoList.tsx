"use client";
import React from "react";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import ToDoIcon from "@/app/assets/img/todo.svg";
import Image from "next/image";
import accured from "@/app/assets/img/accured CL.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import "./dashboard.css";

function ToDoList() {
  return (
    <div>
      <div>My Request</div>

      {[0, 1].map((value) => {
        return (
          <>
            <div className="d-flex align-items-start mt-3 todoList">
              <Image src={ToDoIcon} alt="" />
              <div className="ms-2 w-100">
                <div>I-9 for contractor Alpha (AP001) has been due </div>
                <div className="d-flex justify-content-between mt-1">
                  <div>
                    <DeleteIcon />
                    2024-10-05
                  </div>
                  <div>
                    <DeleteIcon />
                    2024-10-05
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default ToDoList;
