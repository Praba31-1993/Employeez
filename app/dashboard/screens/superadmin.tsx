"use client";
import React, { useEffect, useState } from "react";
import ListCard from "../../reusableComponent/listitems";
import ProfilesCard from "../components/profilescard";
import Pendinginvoice from "../components/pendinginvoice";
import { Colors } from "../../reusableComponent/styles";
import Menulistforbirthdayworkvacation from "../components/menulistforbirthdayworkvacation";
import birthday from "@/app/assets/img/birthday.svg";
import anniversary from "@/app/assets/img/anniversary.svg";
import BarChartComponent from "../../reusableComponent/chart/barchart";
import HorizontalBars from "../../reusableComponent/chart/horizontalbarchart";
import ToDoIcon from "@/app/assets/img/todo.svg";
import Image from "next/image";
import Outlinebutton from "../../reusableComponent/outlinebtn";
import Hrdatas from "../components/hrdatas";
import InterestsIcon from '@mui/icons-material/Interests';
import {
  arrayList,
  salesReportDatas,
  HiringCounts,
} from "../../reusableComponent/JsonData";
import ToDoList from "../components/toDoList";

const SuperAdminDashboard = () => {
  const [birthdayAnniversaryReport, setbirthdayAnniversaryReport] = useState();
  const useColors = Colors();
  const borderAndBoxShadowStyles = {
    border: useColors.border,
    boxShadow: useColors.boxshadow,
  };

  useEffect(() => {
    setbirthdayAnniversaryReport(arrayList);
  }, []);

    return (
        <div className="container-fluid my-3">
            <div className="row ">
                {/* ProfileCard */}
                <div className="col-12 mb-3 col-md-8">
                    <div
                        className="dashboardcard  h-100  p-3"
                        style={borderAndBoxShadowStyles}
                    >
                        <ProfilesCard />
                    </div>
                </div>

                {/*My Request Card  */}
                <div className="col-12 mb-3 col-md-4">
                    <div className="dashboardcard  p-3 h-100  " style={borderAndBoxShadowStyles}>
                        <ListCard />
                    </div>
                </div>

                {/* Pending Invoice */}
                <div className=" col-12 mb-3 col-md-5 "  >
                    <div
                        className="dashboardcard p-3  h-100"
                        style={borderAndBoxShadowStyles}
                    >
                        <Pendinginvoice />
                    </div>
                </div>

                {/* To Do List */}
                <div className=" col-12 mb-3 col-xxl-3 col-md-4 ">
                    <div
                        className="dashboardcard p-3 h-100"
                        style={borderAndBoxShadowStyles}
                    >
                                   <ToDoList title={"My Request"} />{" "}
 
                    </div>
                </div>

                {/* Upcoming birthday and Work Anniversary */}
                <div className=" col-12 mb-3 col-xxl-4 col-md-3 ">
                    <div className="row h-100 align-content-between">
                        <div className="col-12">
                            <div
                                className="dashboardcard p-2 mb-3"
                                style={borderAndBoxShadowStyles}
                            >
                                <Menulistforbirthdayworkvacation
                                    title={"Upcoming birthday"}
                                    headerImage={birthday}
                                    items={birthdayAnniversaryReport}
                                />
                            </div>
                        </div>
                        <div className="col-12" style={{alignSelf:"baseline"}}>
                            <div className="dashboardcard p-2" style={borderAndBoxShadowStyles}>
                                <Menulistforbirthdayworkvacation
                                    title={"Work anniversary"}
                                    headerImage={anniversary}
                                    items={birthdayAnniversaryReport}
                                />
                            </div>
                        </div>
                    </div>


                </div>

        {/* Project extension, Vacation report, Open jobs, I-9 Verify */}
        <div className=" col-12 mb-3 col-md-6 ">
          <div className="row  h-100 align-content-between">
            <div className="col-sm-12 col-md-6  ">
              <div
                className="dashboardcard p-3"
                style={{
                  border: useColors.border,
                  boxShadow: useColors.boxshadow,
                }}
              >
                <Menulistforbirthdayworkvacation
                  title={"Project extension"}
                  headerImage={anniversary}
                  items={birthdayAnniversaryReport}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-6 ">
              <div
                className="dashboardcard p-3"
                style={{
                  border: useColors.border,
                  boxShadow: useColors.boxshadow,
                }}
              >
                <Menulistforbirthdayworkvacation
                  title={"Vacation report"}
                  headerImage={anniversary}
                  items={birthdayAnniversaryReport}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-6  ">
              <div
                className="dashboardcard p-3"
                style={{
                  border: useColors.border,
                  boxShadow: useColors.boxshadow,
                }}
              >
                <Menulistforbirthdayworkvacation
                  title={"Open jobs"}
                  headerImage={anniversary}
                  items={birthdayAnniversaryReport}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-6  ">
              <div
                className="dashboardcard p-3"
                style={{
                  border: useColors.border,
                  boxShadow: useColors.boxshadow,
                }}
              >
                <Menulistforbirthdayworkvacation
                  title={"I-9 Verify"}
                  headerImage={anniversary}
                  items={birthdayAnniversaryReport}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sales Report */}
        <div className=" col-12 mb-3 col-md-6">
          <div className="dashboardcard p-3">
            <div className="row">
            <p className="textheader heading2">Sales Report</p>

              <div className=" col-12 mb-3 col-md-7 ">
                <BarChartComponent />
              </div>
              <div className=" col-12 mb-3 col-md-5 ">
                <Menulistforbirthdayworkvacation
                  title={"Work anniversary"}
                  headerImage={anniversary}
                  items={salesReportDatas}
                  isSalesReport={true}
                  lastmonthReport={"$2845K"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pending HR action */}

        <div className="col-12 mb-3 col-md-4 ">
          <div className="dashboardcard p-3">
            <p className="textheader heading2">Pending HR action</p>

            <HorizontalBars />
          </div>
        </div>

        <div className="col-12 mb-3 col-md-2 ">
          {HiringCounts?.map((list: any, index: number) => (
            <>
              <Hrdatas hrList={list} isPendingHrData={true} />
            </>
          ))}
        </div>

        {/* Policy/Procedure  */}
        <div className="col-12 mb-3 col-md-3">
          <div className="dashboardcard p-3">
            <p className="textheader heading2">Policy/Procedure </p>
            <div
              className="d-flex flex-wrap flex-column gap-3"
              style={{ height: "10rem" }}
            >
              <div className="row p-0 mb-0">
                {HiringCounts?.map((list: any, index: number) => (
                  <div className="col-12 col-md-6">
                    <Hrdatas hrList={list} isPendingHrData={false} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Need help? */}
        <div className="col-12 mb-3 col-md-3">
          <div className="dashboardcard p-3">
            <div className="d-flex justify-content-between ">
              <p className="textheader heading2">Need help?</p>

              <Image src={ToDoIcon} alt="" />
            </div>
            <p className="para shade">
              Do you face any problem while using EmployEz?
            </p>
            <Outlinebutton
              color={useColors.white}
              border={`1px solid ${useColors.themeRed}`}
              text="Contact us"
              fontSize="12px"
              background={useColors.themeRed}
              isDashboardIcon={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
