import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { Skincustomization } from "./skin";
import { Colorcustomization } from "./colourcustomization";
import { Modecustomization } from "./modecustomization";
import { Dashboardcustomization } from "./dashboardcustmization";


export function Themecustomization({ show, close, }: any) {

  


    return (
        <section className={`showpopup ${show ? "showpopupactive" : ""}`}>
            <div className="summarysection theme" style={{ width: "30vw" }}>
                <div className="container-fluid">
                    <div className="row px-2 summary" style={{ borderBottom: "0px" }}>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-8 pb-2" style={{ borderBottom: "1px solid #8d8d8d4f" }}>
                                    <div className="approverlist align-items-center d-flex mt-2" >
                                        <div className="roles">
                                            <h5 className="para ps-2 mb-0">Theme customizer</h5>
                                            <p className="para2 ps-2 mb-0 mt-1 shade">Customize & Preview on realtime</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3 text-end px-0 pb-2" style={{ fontSize: "20px", borderBottom: "1px solid #8d8d8d4f" }}>
                                    <RestartAltIcon className="shade mx-1 " />
                                </div>
                                <div className="col-1 pb-2 pt-1">
                                    <FontAwesomeIcon className="" icon={faXmark} onClick={close} />
                                </div>
                            </div>
                        </div>
                        <Colorcustomization />
                        <Skincustomization />
                        <Modecustomization />
                        <Dashboardcustomization />
                    </div>
                </div>
            </div>
        </section>
    );
}
