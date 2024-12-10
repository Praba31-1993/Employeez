import React, { useState, useEffect } from "react";
import { Colors } from "../../reusableComponent/styles";
import ProfilesCard from "../components/profilescard";
import ListCard from "@/app/reusableComponent/listitems";
import ToDoList from "../components/toDoList";
import Menulistforbirthdayworkvacation from "../components/menulistforbirthdayworkvacation";
import birthday from "@/app/assets/img/birthday.svg";
import Pendinginvoice from "../components/pendinginvoice";
import { arrayList } from "@/app/reusableComponent/JsonData";
import BarChartComponent, {
  Salesreport,
} from "@/app/reusableComponent/chart/barchart";
import Policyprocedure from "../components/policyprocedure";
import Workanniversary from "../components/workanniversary";
import Openjobs from "../components/openjobs";
import Needhelp from "../components/needhelp";

function SalesManager() {
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
        <div className="col-md-8 col-12">
          <div className="row ">
            <div className="col-12 mb-3">
              <div
                className="dashboardcard  h-100  p-3 mb-3"
                style={borderAndBoxShadowStyles}
              >
                <ProfilesCard />
              </div>
            </div>

            <div className="col-6 mb-3">
              <div
                className="dashboardcard p-3  h-100 mb-3"
                style={borderAndBoxShadowStyles}
              >
                <Pendinginvoice />
              </div>
            </div>

            <div className="col-6 mb-3">
              <div
                className="dashboardcard p-3 h-100 mb-3"
                style={borderAndBoxShadowStyles}
              >
                <ToDoList title={"My Request"} />{" "}
              </div>
            </div>
            <div className="col-8 mb-3">
              <div className="dashboardcard h-100 p-3">
                <div className="row">
                  <p className="textheader heading2">Sales Report</p>

                  <div className="col-12 mb-3 col-md-8 ">
                    <BarChartComponent />
                  </div>
                  <div
                    className="col-4 "
                    style={{ borderLeft: "1px solid #A8A8A8" }}
                  >
                    <Salesreport />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4 mb-3">
              <div className="dashboardcard h-100 p-3">
                <p className="textheader heading2">Policy/Procedure </p>
                <Policyprocedure />{" "}
              </div>
            </div>
          </div>
        </div>
        {/* small Screens */}
        <div className="col-md-4 col-12">
          <div className="row mb-3">
            <div className="col-12 mb-3">
              <div
                className="dashboardcard  p-3 h-100  "
                style={borderAndBoxShadowStyles}
              >
                <ListCard />
              </div>
            </div>
            <div className="col-12 mb-3">
              <div
                className="dashboardcard  p-3 h-100  "
                style={borderAndBoxShadowStyles}
              >
                <Menulistforbirthdayworkvacation
                  title={"Upcoming birthday"}
                  headerImage={birthday}
                  items={birthdayAnniversaryReport}
                />
              </div>
            </div>
            <div className="col-12 mb-3">
              <div
                className="dashboardcard  p-3 h-100  "
                style={borderAndBoxShadowStyles}
              >
                <Workanniversary />
              </div>
            </div>

            <div className="col-12 mb-3">
              <div
                className="dashboardcard  p-3 h-100  "
                style={borderAndBoxShadowStyles}
              >
                <Openjobs />
              </div>
            </div>

            <div className="col-12 mb-3">
              <div
                className="dashboardcard  p-3 h-100  "
                style={borderAndBoxShadowStyles}
              >
                <Needhelp />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesManager;
