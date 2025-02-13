"use client";
import React, { useEffect, useState } from "react";
import ListCard from "../../reusableComponent/listitems";
import ProfilesCard from "../components/profilescard";
import Pendinginvoice from "../components/pendinginvoice";
import { Colors } from "../../reusableComponent/styles";
import Menulistforbirthdayworkvacation from "../components/menulistforbirthdayworkvacation";
import BarChartComponent, {
    Salesreport,
} from "../../reusableComponent/chart/barchart";
import HorizontalBars from "../../reusableComponent/chart/horizontalbarchart";
import Hrdatas from "../components/hrdatas";
import { arrayList } from "../../reusableComponent/JsonData";
import ToDoList from "../components/toDoList";
import Workanniversary from "../components/workanniversary";
import ProjectExtension from "../components/projectsextension";
import Vacationreport from "../components/vacationreport";
import Openjobs from "../components/openjobs";
import Inineverify from "../components/inineverify";
import Policyprocedure from "../components/policyprocedure";
import Needhelp from "../components/needhelp";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "@/app/redux/slices/currencySlice";
import Employees from "../components/employees";

const SuperAdminDashboard = () => {
    const [birthdayAnniversaryReport, setbirthdayAnniversaryReport] = useState();
    const [dummyUser, setDummyUser] = useState<any>();

    const useColors = Colors();
    const borderAndBoxShadowStyles = {
        border: useColors.border,
        boxShadow: useColors.boxshadow,
    };

    const dispatch = useDispatch();
    const dummyUserData = useSelector((state: any) => state.currency);

    useEffect(() => {
        setbirthdayAnniversaryReport(arrayList);
        dispatch(updateUser({ name: "Vikram", countryCode: "CAD" }));
    }, []);

    useEffect(() => {
        setDummyUser(dummyUserData);
    }, [dummyUserData]);

    return (
        <div className="container-fluid px-lg-0 my-3">
            {/* <p> {moment("2024-07-30").format(`${dummyUser?.dateFormat}`)}</p>
      <p>{dummyUser?.currency + "15000"}</p>
      */}
            <div className="row ">
                {/* ProfileCard */}
                <div className="col-12 mb-3 col-lg-8">
                    <div
                        className="dashboardcard  h-100  p-3"
                        style={borderAndBoxShadowStyles}
                    >
                        <ProfilesCard />
                    </div>
                </div>

                {/*My Request Card  */}
                <div className="col-12 mb-3 col-lg-4 col-sm-6">
                    <div
                        className="dashboardcard  p-3 h-100  "
                        style={borderAndBoxShadowStyles}
                    >
                        <ListCard />
                    </div>
                </div>

                {/* Pending Invoice */}
                <div className=" col-12 mb-3 col-md-6 col-lg-5  col-xxl-4">
                    <div
                        className="dashboardcard p-3  h-100"
                        style={borderAndBoxShadowStyles}
                    >
                        <Pendinginvoice />
                    </div>
                </div>

                {/* To Do List */}
                <div className=" col-12 mb-3 col-xxl-4 col-lg-4 col-md-7 ">
                    <div
                        className="dashboardcard p-3 h-100"
                        style={borderAndBoxShadowStyles}
                    >
                        <ToDoList title={"My Request"} />{" "}
                    </div>
                </div>

                {/* Upcoming birthday and Work Anniversary */}
                <div className=" col-12 mb-3 col-xxl-4 col-lg-3 col-md-5 px-0">
                    <div className="row h-100 align-content-between">
                        <div className="col-12">
                            <div
                                className="dashboardcard p-lg-2 p-3 p-xxl-3 mb-3"
                                style={borderAndBoxShadowStyles}
                            >
                                <Menulistforbirthdayworkvacation
                                    title={"Upcoming birthday"}
                                    headerImage={"/assets/img/birthday.svg"}
                                    items={birthdayAnniversaryReport}
                                />
                            </div>
                        </div>
                        <div className="col-12" style={{ alignSelf: "baseline" }}>
                            <div
                                className="dashboardcard p-lg-2 p-3 p-xxl-3"
                                style={borderAndBoxShadowStyles}
                            >
                                <Workanniversary />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project extension, Vacation report, Open jobs, I-9 Verify */}
                <div className=" col-12 mb-3 col-md-6 col-lg-3 px-0">
                    <div className="row  h-100 align-content-between">
                        <div className="col-sm-12 ">
                            <div
                                className="dashboardcard p-3 mb-3 "
                                style={{
                                    border: useColors.border,
                                    boxShadow: useColors.boxshadow,
                                }}
                            >
                                <ProjectExtension />
                            </div>
                        </div>
                        <div className="col-sm-12   ">
                            <div
                                className="dashboardcard p-3"
                                style={{
                                    border: useColors.border,
                                    boxShadow: useColors.boxshadow,
                                }}
                            >
                                <Openjobs />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" col-12 mb-3 col-lg-3 col-md-6 px-0">
                    <div className="row  h-100 align-content-between">
                        <div className="col-sm-12  mb-sm-2 mb-3">
                            <div
                                className="dashboardcard p-3"
                                style={{
                                    border: useColors.border,
                                    boxShadow: useColors.boxshadow,
                                }}
                            >
                                <Vacationreport />
                            </div>
                        </div>
                        <div className="col-sm-12  ">
                            <div
                                className="dashboardcard p-3"
                                style={{
                                    border: useColors.border,
                                    boxShadow: useColors.boxshadow,
                                }}
                            >
                                <Inineverify />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sales Report */}
                <div className=" col-12 mb-3 col-lg-6 col-md-9">
                    <div
                        className="dashboardcard h-100 p-3"
                        style={{ border: useColors.border, boxShadow: useColors.boxshadow }}
                    >
                        <div className="row">
                            <p className="textheader heading2">Sales Report</p>
                            <div className=" col-12 mb-3 col-md-8 ">
                                <BarChartComponent />
                            </div>
                            <div className="col-12 mb-3 col-md-4  leftborders">
                                <Salesreport />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending HR action */}

                <div className="col-12 mb-3 col-lg-2 col-md-3 ">
                    <div className="row w-100 m-0 h-100 align-content-between">
                        <Hrdatas />
                    </div>
                </div>

                <div className="col-12 mb-3 pendinghrsolution col-lg-4  col-md-5">
                    <div className="dashboardcard  p-3" style={borderAndBoxShadowStyles}>
                        <p className="textheader mb-0 heading2">Pending HR action</p>
                        <div className="" style={{ overflowX: "auto" }}>
                            <HorizontalBars />
                        </div>
                    </div>
                </div>

                {/* employees */}
                <div className=" col-12 mb-3 col-md-6 col-lg-6  col-xxl-4">
                    <div
                        className="dashboardcard p-3  h-100"
                        style={borderAndBoxShadowStyles}
                    >
                        <Employees />
                    </div>
                </div>
                {/* Policy/Procedure  */}
                <div className="col-12 mb-3 col-lg-3 col-md-4">
                    <div className="dashboardcard p-3" style={borderAndBoxShadowStyles}>
                        <p className="textheader heading2">Policy/Procedure </p>
                        <div className="d-flex flex-wrap flex-column gap-3">
                            <div className="row p-0 mb-0">
                                <Policyprocedure />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Need help? */}
                <div className="col-12 mb-3 col-md-3">
                    <div className="dashboardcard p-3" style={borderAndBoxShadowStyles}>
                        <Needhelp />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
