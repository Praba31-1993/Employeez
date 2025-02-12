"use Client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Image from "next/image";
import user from "@/public/assets/img/Ellipse 14.svg";
import Outlinebutton from "@/app/reusableComponent/outlinebtn";
import { Colors } from "@/app/reusableComponent/styles";
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import User_comphistory from "./user_comp_history";

function Comp_history_popup({ show, close }: any) {
    const useColors = Colors();
    return (
        <section className={`showpopup ${show ? "showpopupactive" : ""}`} onClick={close}>
            <div className="summarysection" onClick={(e) => e.stopPropagation()}>
                <div className=" text-end me-3">
                    <FontAwesomeIcon
                        className="my-2 textheader" style={{ cursor: "pointer" }}
                        icon={faXmark}
                        onClick={close}
                    />
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex mt-2 pb-2 align-tems-center justify-content-between borderbottom"  >
                                <div className="d-flex align-tems-center">
                                    <div style={{ width: "40px", height: "40px" }}>
                                        <Image className="w-100 h-100 rounded-circle" src={user} style={{ objectFit: "cover" }} alt={""} />
                                    </div>
                                    <div className="ms-2">
                                        <h4 className="heading2 mb-0 textheader">Simi Rajan (SR3894)</h4>
                                        <h5 className="para mb-0 textheader">Employee</h5>
                                    </div>
                                </div>
                                <div className="">
                                    <Outlinebutton
                                        color={useColors.themeRed}
                                        border={`1px solid ${useColors.themeRed}`}
                                        text="Export "
                                        fontSize="12px"
                                        background={"transparent"}
                                        icon={<SaveAltOutlinedIcon />}

                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3  " >
                    <User_comphistory />

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Comp_history_popup
