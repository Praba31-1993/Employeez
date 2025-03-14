"use Client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import {  useState } from "react";
import Outlinebutton from "@/app/reusableComponent/outlinebtn";
import Listicon from "@/app/reusableComponent/listicon";
import LogoutIcon from '@mui/icons-material/Logout';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Uploadfiles({ show, close }: any) {
    const [files, setFiles] = useState<File[]>([]); // Explicitly define type as File[]

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
            setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Update state
        }
    };
    // Handle file removal
    const handleRemoveFile = (index: any) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <section className={`showpopup ${show ? "showpopupactive" : ""}`}  onClick={close}>
            <div className="summarysection" onClick={(e) => e.stopPropagation()}>
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
                            <div className="summarydetails p-3 m-sm-2"  >
                                <h5 className="para  textheader">Choose file </h5>
                                <div className="fileupload py-4 d-flex align-items-center flex-column justify-content-center mt-3">
                                    {/* <Image src={uploadicon} alt={""} /> */}
                                    <LogoutIcon className="textheader" sx={{rotate:"-90deg"}} />
                                    <h2 className="heading2 mt-2 textheader">
                                        Drag and drop your file here
                                    </h2>
                                    <p className="headindg unselectcolor">or</p>
                                    <Outlinebutton
                                        color="#8C57FF"
                                        border="1px solid #8C57FF"
                                        text="Browse File"
                                        fontSize="12px"
                                        variant={"outlined"}

                                    />
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        style={{ display: "block", marginBottom: "1rem" }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 my-2 ps-3">
                            <h4 className="para textheader">
                                Number of files: <span className=" fs-6">{files.length}</span>
                            </h4>
                        </div>
                        <div className="col-12">
                            {files.map((file, index) => (
                                <Listicon
                                    key={index}
                                    text={file.name}
                                    remove={() => handleRemoveFile(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}



export function Viewfiles() {
   
  
    return (
      <div className="accordion accordion-flush mt-4" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button style={{background:"transparent"}}
              className="accordion-button p-0 unselectcolor para collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              View file
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body py-2 px-3 mt-3">
              <div className=" align-items-center d-flex">
                <DescriptionOutlinedIcon sx={{ color: "#8C57FF" }} />
                <p className="para ps-2 mb-0 unselectcolor">Document</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
