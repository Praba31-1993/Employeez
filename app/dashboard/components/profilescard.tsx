"use client";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Outlinebutton, {
  IconOutlinebutton,
} from "@/app/reusableComponent/outlinebtn";
import Menulistitem from "@/app/reusableComponent/menulist";
import { Colors } from "@/app/reusableComponent/styles";
import Image from "next/image";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Timer from "@/app/reusableComponent/timer";
import Contacts from "./contacts";
import ImageComponent from "@/app/reusableComponent/image";

export default function ProfilesCard() {
  const useColors = Colors();
  const [open, setOpen] = useState(false);
  const [punchIn, setPunchIn] = useState<Boolean>(false);
  const [totalTime, setTotalTime] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const arrayList = [
    {
      holidaysname: "Total Holiday",
      noofholidays: "32",
      img: "/assets/img/usedholidays.svg",
    },
    {
      holidaysname: "Used Holiday",
      noofholidays: "11",
      img: "/assets/img/totalholidays.svg",
    },
    {
      holidaysname: "Balance Holiday",
      noofholidays: "12",
      img: "/assets/img/balanceholidays.svg",
    },
    {
      holidaysname: "Balance CL",
      noofholidays: "12",
      img: "/assets/img/balancecl.svg",
    },
    {
      holidaysname: "Balance SL",
      noofholidays: "08",
      img: "/assets/img/balancesl.svg",
    },
    {
      holidaysname: "Important contact",
      noofholidays: "20",
      img: "/assets/img/contact.svg",
    },
  ];

  useEffect(() => {
    // Simulating a fetch delay for demo purposes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Loader will disappear after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {open && <Contacts show={open} close={() => setOpen(false)} />}
      <div className="flex justify-content-between pb-2">
        <Menulistitem />
        <div className="d-flex align-items-center pe-sm-5">
          {loading ? (
            <Skeleton height={20} width={100} className="me-2" />
          ) : (
            <p
              className="mb-0 cursorPointer para pe-3 d-sm-block d-none"
              style={{ color: useColors.themeRed }}
            >
              Supervisee
            </p>
          )}
          <div >
            <IconOutlinebutton
              color={useColors.white}
              border={`1px solid ${useColors.themeRed}`}
              text={punchIn ? "Punch out" : "Punch in"}
              fontSize="12px"
              background={useColors.themeRed}
              disabled={true}
              onClick={() => setPunchIn((prev) => !prev)}
              icon={
                punchIn
                  ? "/assets/img/downarrrowCircle.svg"
                  : "/assets/img/rightarrow.svg"
              }
              variant={"contained"}
            />
          </div>
          {punchIn && (
            <Timer
              starttime={punchIn}
              timevalue={(data: any) => setTotalTime(data)}
            />
          )}
        </div>
      </div>
      <div className="d-sm-flex d-none  justify-content-between justify-content-xxl-start gap-xxl-5 flex-wrap">
        {loading
          ? // Skeleton Loader for the list items
            Array(6)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="d-flex my-2 flex-column">
                  <div className="d-flex gap-2 align-items-center">
                    <Skeleton circle={true} height={40} width={40} />
                    <Skeleton height={20} width={50} />
                  </div>
                  <Skeleton height={20} width={100} className="mt-2" />
                </div>
              ))
          : // Render the actual data
            arrayList?.map((list: any, index: number) => {
              const isLastChild = index === arrayList.length - 1;

              return (
                <div key={index} className="d-flex my-2 flex-column">
                  <div className="d-flex gap-2 align-items-center">
                    <ImageComponent width={0} height={0} user={list?.img} />
                    <h6 className="mb-0 textheader heading2">
                      {list.noofholidays}
                    </h6>
                  </div>
                  <p
                    className="para pt-2 text-center mb-0 shade"
                    style={{
                      color: isLastChild ? useColors.themeRed : undefined,
                    }}
                  >
                    {list.holidaysname}{" "}
                    {isLastChild && (
                      <span>
                        <VisibilityOutlinedIcon
                          className="ps-1 cursorPointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpen((prev) => !prev);
                          }}
                        />
                      </span>
                    )}{" "}
                  </p>
                </div>
              );
            })}
      </div>
      {/* mobile */}
      <div className="row d-sm-none ">
        {loading
          ? // Skeleton Loader for the list items
            Array(6)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="d-flex my-2 flex-column">
                  <div className="d-flex gap-2 align-items-center">
                    <Skeleton circle={true} height={40} width={40} />
                    <Skeleton height={20} width={50} />
                  </div>
                  <Skeleton height={20} width={100} className="mt-2" />
                </div>
              ))
          : // Render the actual data
            arrayList?.map((list: any, index: number) => {
              const isLastChild = index === arrayList.length - 1;

              return (
                <div key={index} className="col-6 px-0 my-2 ">
                  <div className="d-flex gap-2 align-items-center">
                    <ImageComponent width={0} height={0} user={list?.img} />
                    <h6 className="mb-0 textheader heading2">
                      {list.noofholidays}
                    </h6>
                  </div>
                  <p
                    className="para2 pt-2  mb-0 shade"
                    style={{
                      color: isLastChild ? useColors.themeRed : undefined,
                    }}
                  >
                    {list.holidaysname}{" "}
                    {isLastChild && (
                      <span>
                        <VisibilityOutlinedIcon
                          className="ps-1 cursorPointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpen((prev) => !prev);
                          }}
                        />
                      </span>
                    )}{" "}
                  </p>
                </div>
              );
            })}
      </div>
    </>
  );
}
