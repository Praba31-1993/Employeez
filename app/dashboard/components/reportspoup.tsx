"use Client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Reportspoup({ show, close }: any) {

    return (
        <section className={`showpopup ${show ? "showpopupactive" : ""}`}  onClick={close}>
            <div className="summarysection rounded m-auto" style={{width:"90%",height:"95%"}} onClick={(e) => e.stopPropagation()}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 text-end">
                            <FontAwesomeIcon
                                className="my-2 textheader" style={{ cursor: "pointer" }}
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

