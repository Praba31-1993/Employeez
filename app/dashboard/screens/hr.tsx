"use client";
import React, { useEffect, useState } from "react";
import ListCard from "../../reusableComponent/listitems";
import ProfilesCard from "../components/profilescard";
import { Colors } from "../../reusableComponent/styles";
import ToDoList from "../components/toDoList";
import Menulistforbirthdayworkvacation from "../components/menulistforbirthdayworkvacation";
import anniversary from "@/public/assets/img/anniversary.svg";
import HorizontalBars from "../../reusableComponent/chart/horizontalbarchart";
import Outlinebutton from "../../reusableComponent/outlinebtn";
import Hrdatas from "../components/hrdatas";
import { arrayList } from "../../reusableComponent/JsonData";
import NewHireCandidate from "../components/newhirecandidate";
import ImageComponent from "@/app/reusableComponent/image";

const HrDashboard = () => {
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
          <div className="dashboardcard  p-3 h-100">
            <ListCard />
          </div>
        </div>

        {/* Pending HR action */}

        <div className="col-12 mb-3 col-md-2 ">
          <div className="row w-100 m-0 h-100 align-content-between">
            <Hrdatas />
          </div>
        </div>

        <div className="col-12 mb-3 col-md-4 ">
          <div className="dashboardcard p-3 h-100">
            <p className="textheader heading2">Pending HR action</p>

            <div style={{ overflowX: "auto", width: "100%", height: "auto" }}>
              <HorizontalBars />
            </div>
          </div>
        </div>

        {/* To Do List */}
        <div className=" col-12 mb-3 col-md-3 ">
          <div
            className="dashboardcard p-3 h-100"
            style={borderAndBoxShadowStyles}
          >
            <ToDoList  />
          </div>
        </div>

        {/* Upcoming birthday and Work Anniversary */}
        <div className="col-12 mb-3 col-md-3 ">
          <div className="row h-100 justify-content-between">
            <div
              className="dashboardcard p-2 mb-3"
              style={borderAndBoxShadowStyles}
            >
              <Menulistforbirthdayworkvacation
                title={"Upcoming birthday"}
                headerImage={"/assets/img/birthday.svg"}
                items={birthdayAnniversaryReport}
              />
            </div>
            <div className="dashboardcard p-2" style={borderAndBoxShadowStyles}>
              <Menulistforbirthdayworkvacation
                title={"Work anniversary"}
                headerImage={anniversary}
                items={birthdayAnniversaryReport}
              />
            </div>
          </div>
        </div>

        <div className=" col-12 mb-3 col-md-2">
          <div className="row h-100 justify-content-between gap-3">
            <div className="dashboardcard p-2" style={borderAndBoxShadowStyles}>
              <NewHireCandidate
                title={"New hire candidate"}
                headerImage={anniversary}
                items={birthdayAnniversaryReport}
              />
            </div>
            <div className="dashboardcard p-2" style={borderAndBoxShadowStyles}>
              <NewHireCandidate
                title={"Prehire candidate"}
                headerImage={anniversary}
                items={birthdayAnniversaryReport}
              />
            </div>
          </div>
        </div>

        <div className=" col-12 mb-3 col-md-3">
          <div
            className="dashboardcard p-2 h-100"
            style={borderAndBoxShadowStyles}
          >
            {/* <NewHireCandidate
              title={"Pending Timesheet"}
              headerImage={anniversary}
              items={birthdayAnniversaryReport}
            /> */}
            <ToDoList />
          </div>
        </div>

        {/* I9-Verify and E-verify */}
        <div className=" col-12 mb-3 col-md-3">
          <div className="row h-100 justify-content-between gap-3">
            <div className="dashboardcard p-2" style={borderAndBoxShadowStyles}>
              <NewHireCandidate
                title={"New hire candidate"}
                headerImage={anniversary}
                items={birthdayAnniversaryReport}
              />
            </div>
            <div className="dashboardcard p-2" style={borderAndBoxShadowStyles}>
              <NewHireCandidate
                title={"New hire candidate"}
                headerImage={anniversary}
                items={birthdayAnniversaryReport}
              />
            </div>
          </div>
        </div>

        {/*My Request Card  */}
        <div className="col-12 mb-3 col-md-4">
          <div className="d-flex flex-column gap-3">
            <div className="dashboardcard p-3 h-100">
              <ListCard />
            </div>
            <div className="dashboardcard p-3">
              <p className="textheader heading2 fw-bold">Policy/Procedure </p>
              <div
                className="d-flex flex-wrap flex-column gap-3"
                style={{ height: "10rem" }}
              >
                <div className="row p-0 mb-0">
                  <div className="col-12 col-md-6">
                    <Hrdatas />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vacation Report */}
        <div className="col-12 mb-3 col-md-2">
          <div className="dashboardcard p-2" style={borderAndBoxShadowStyles}>
            <Menulistforbirthdayworkvacation
              title={"Vacation Report"}
              headerImage={anniversary}
              items={birthdayAnniversaryReport}
            />
          </div>
        </div>

        {/* Termination list */}
        <div className="col-12 mb-3 col-md-3">
          <div className="dashboardcard p-2" style={borderAndBoxShadowStyles}>
            <Menulistforbirthdayworkvacation
              title={"Termination list"}
              headerImage={anniversary}
              items={birthdayAnniversaryReport}
            />
          </div>
        </div>

        <div className="col-12 mb-3 col-md-3">
          <div className="dashboardcard p-2" style={borderAndBoxShadowStyles}>
            <Menulistforbirthdayworkvacation
              title={"Termination list"}
              headerImage={anniversary}
              items={birthdayAnniversaryReport}
            />
          </div>
        </div>

        {/* Need help? */}
        <div className="col-12 mb-3 col-md-3">
          <div className="dashboardcard p-3">
            <div className="d-flex justify-content-between ">
              <p className="textheader heading2 fw-bold">Need help?</p>

              {/* <Image src={ToDoIcon} alt="" /> */}
              <ImageComponent
                width={0}
                height={0}
                user={"/assets/img/todo.svg"}
              />
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
              variant={"contained"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;
