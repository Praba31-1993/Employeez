"use Client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Employreportdetails({ show, close }: any) {

    return (
        <section className={`showpopup ${show ? "showpopupactive" : ""}`} onClick={close}>
            <div className="summarysection rounded m-auto" style={{ width: "90%", height: "95%", background: "#F5F5F5" }} onClick={(e) => e.stopPropagation()}>
                <div className="container-fluid">
                    <div className="row my-2">
                        <div className="col-6 text-end">
                            <div className="d-flex align-items-center cursorpointer" onClick={close}>
                                <ArrowBackIcon className="textheader me-2"   />
                                <p className="para mb-0 textheader">Back</p>
                            </div>
                        </div>
                        <div className="col-6 text-end">
                            <FontAwesomeIcon
                                className=" textheader" style={{ cursor: "pointer" }}
                                icon={faXmark}
                                onClick={close}
                            />
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

