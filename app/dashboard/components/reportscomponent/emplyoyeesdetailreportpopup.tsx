"use Client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Colors } from "@/app/reusableComponent/styles";
import Basicinfo from "./basicinfo";

export default function Employreportdetails({ show, close }: any) {
    const useColors = Colors();

    return (
        <section className={`showpopup ${show ? "showpopupactive" : ""}`} onClick={close}>
            <div className="summarysection rounded m-auto" style={{ width: "90%", height: "95%", background: "#F5F5F5" }} onClick={(e) => e.stopPropagation()}>
                <div className="container-fluid">
                    <div className="d-flex px-2 my-2 align-items-center justify-content-between">
                        <div className="">
                            <p className="heading mb-0 textheader">Manish Yadhav (MY1234)</p>
                        </div>
                        <div className="d-flex  gap-4 align-items-center justify-content-end cursorpointer">
                            <div className="tools">
                                <div className="dropdown">
                                    <a
                                        className="dropdown-toggle"

                                        role="button"
                                        id="dropdownMenuLink"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <SettingsOutlinedIcon className="textheader cursorpointer" />
                                    </a>
                                    <ul
                                        className="dropdown-menu dashboardcard custom-scrollbar"
                                        aria-labelledby="dropdownMenuLink"

                                    >

                                        <li className="dropdown-item textheader">
                                            <label >
                                                <Checkbox

                                                    sx={{
                                                        cursor: "pointer",
                                                        "&.Mui-checked": { color: useColors.themeRed },
                                                    }}
                                                /> Basic Info
                                            </label>
                                        </li>

                                    </ul>
                                </div>

                            </div>

                            <FontAwesomeIcon
                                className=" textheader" style={{ cursor: "pointer" }}
                                icon={faXmark}
                                onClick={close}
                            />
                        </div>

                    </div>
                    <div className="row my-2">
                        <div className="col-6 text-end">
                       <Basicinfo />
                        </div>
                        <div className="col-4 text-end ">


                        </div>
                    </div>
                    <div className="row mt-3 px-sm-5 " >
                        <div className="col-12 " >

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

