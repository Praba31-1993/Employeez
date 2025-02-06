"use Client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useEffect, useState } from "react";
import Outlinebutton from "@/app/reusableComponent/outlinebtn";
import ImageComponent from "@/app/reusableComponent/image";
import Listicon from "@/app/reusableComponent/listicon";
import LogoutIcon from '@mui/icons-material/Logout';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
function Upload_document() {
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
        <div className='row'>
            <div className="col-md-5 mt-3">
                <h4 className="para2 textheader">Upload documents</h4>
                <div className="fileupload py-4 d-flex align-items-center flex-column justify-content-center mt-3">
                    {/* <Image src={uploadicon} alt={""} /> */}
                    <LogoutIcon className="textheader" sx={{ rotate: "-90deg" }} />
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
            <div className="col-1"></div>
            <div className="col-md-5 mt-3">
                <h4 className="para2 textheader">Uploaded files</h4>
                {files.map((file, index) => (
                    <Listicon
                        key={index}
                        text={file.name}
                        remove={() => handleRemoveFile(index)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Upload_document
