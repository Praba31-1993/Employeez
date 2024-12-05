import React, { useState, useEffect } from "react";
import { Colors } from "../../reusableComponent/styles";
import ProfilesCard from "../components/profilescard";
import ListCard from "@/app/reusableComponent/listitems";
import ToDoList from "../components/toDoList";
import Menulistforbirthdayworkvacation from "../components/menulistforbirthdayworkvacation";
import birthday from "@/app/assets/img/birthday.svg";
import anniversary from "@/app/assets/img/anniversary.svg";
import Pendinginvoice from "../components/pendinginvoice";
import { arrayList } from "@/app/reusableComponent/JsonData";

function ManagerDashboard() {
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
      <div className="row">
        <div className="col-12 col-md-8 mb-3">
          <div
            className="dashboardcard h-100  p-3"
            style={borderAndBoxShadowStyles}
          >
            <ProfilesCard />
          </div>
        </div>
        <div className="col-12 col-md-4 mb-3">
          <div className="dashboardcard p-3 h-100">
            <ListCard />
          </div>
        </div>

          {/* Pending Invoice */}
          <div className=" col-12 col-md-5 mb-3">
          <div
            className="dashboardcard p-3 h-100"
            style={borderAndBoxShadowStyles}
          >
            <Pendinginvoice />
          </div>
        </div>

        {/* To Do List */}
        <div className=" col-12 col-xxl-3 col-md-4 mb-3">
          <div
            className="dashboardcard p-3 h-100"
            style={borderAndBoxShadowStyles}
          >
            <ToDoList title={"My Request"} />{" "}
          </div>
        </div>

        {/* Upcoming birthday and Work Anniversary */}
        <div className=" col-12 col-xxl-4 col-md-3 ">
          <div className="row h-100 align-items-between">
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
            <div className="col-12" style={{ alignSelf: "baseline" }}>
              <div
                className="dashboardcard p-2"
                style={borderAndBoxShadowStyles}
              >
                <Menulistforbirthdayworkvacation
                  title={"Work anniversary"}
                  headerImage={anniversary}
                  items={birthdayAnniversaryReport}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4"></div>
        <div className="col-12 col-md-4"></div>
        <div className="col-12 col-md-4"></div>
        <div className="col-12 col-md-9"></div>
        <div className="col-12 col-md-4"></div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
