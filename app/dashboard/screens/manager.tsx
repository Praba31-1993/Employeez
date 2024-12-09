import React, { useState, useEffect } from "react";
import { Colors } from "../../reusableComponent/styles";
import ProfilesCard from "../components/profilescard";
import ListCard from "@/app/reusableComponent/listitems";
import ToDoList from "../components/toDoList";
import Menulistforbirthdayworkvacation from "../components/menulistforbirthdayworkvacation";
import birthday from "@/app/assets/img/birthday.svg";
import anniversary from "@/app/assets/img/anniversary.svg";
import Pendinginvoice from "../components/pendinginvoice";
import { arrayList, salesReportDatas } from "@/app/reusableComponent/JsonData";
import BarChartComponent from "@/app/reusableComponent/chart/barchart";
import PendingTimeSheet from "../components/pendingTimesheet";
import Policyprocedure from "../components/policyprocedure";
import Image from "next/image";
import Outlinebutton from "@/app/reusableComponent/outlinebtn";
import ToDoIcon from "@/app/assets/img/todo.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Workanniversary from "../components/workanniversary";

function ManagerDashboard() {
  const [birthdayAnniversaryReport, setbirthdayAnniversaryReport] = useState();
  const useColors = Colors();
  const borderAndBoxShadowStyles = {
    border: useColors.border,
    boxShadow: useColors.boxshadow,
  };

  const dashboardLayout = useSelector(
    (state: RootState) => state.dashboardLayout
  );

  console.log("dashboardLaout", dashboardLayout);

  useEffect(() => {
    setbirthdayAnniversaryReport(arrayList);
  }, []);

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-md-8 col-12">
          <div className="row mb-3">
            <div className="col-12">
              <div
                className="dashboardcard  h-100  p-3 mb-3"
                style={borderAndBoxShadowStyles}
              >
                <ProfilesCard />
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="col-6">
              <div
                className="dashboardcard p-3  h-100 mb-3"
                style={borderAndBoxShadowStyles}
              >
                <Pendinginvoice />
              </div>
            </div>

            <div className="col-6">
              <div
                className="dashboardcard p-3 h-100 mb-3"
                style={borderAndBoxShadowStyles}
              >
                <ToDoList title={"My Request"} />{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-12">
          <div className="row mb-3">
            <div
              className="col=12 dashboardcard  p-3 h-100  "
              style={borderAndBoxShadowStyles}
            >
              <ListCard />
            </div>
          </div>
          <div className="row mb-3">
            <div
              className="col=12 dashboardcard  p-3 h-100  "
              style={borderAndBoxShadowStyles}
            >
              <Menulistforbirthdayworkvacation
                title={"Upcoming birthday"}
                headerImage={birthday}
                items={birthdayAnniversaryReport}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div
              className="col=12 dashboardcard  p-3 h-100  "
              style={borderAndBoxShadowStyles}
            >
              <Workanniversary/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
