"use Client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Image from "next/image";
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
                    <div className="row mt-3  " >
                    <User_comphistory />

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Comp_history_popup
