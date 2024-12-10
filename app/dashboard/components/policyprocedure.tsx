import React from "react";
import { Colors } from "@/app/reusableComponent/styles";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import DownhillSkiingOutlinedIcon from "@mui/icons-material/DownhillSkiingOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

interface PolicyprocedureProps {
    isManagerScreen? : boolean;
}
function Policyprocedure({isManagerScreen}:PolicyprocedureProps) {
  const useColors = Colors();

  return (
    <>
    {isManagerScreen ? 
     <div className="row justify-content-between">
     <div className="col-lg-12 col-xxl-2 mt-3">
       <div className="d-flex align-items-center">
         <div
           className="headingicons rounded"
           style={{
             background: "#FFCC5F",
             height: "fit-content",
             width: "fit-content",
           }}
         >
           <AccountBalanceOutlinedIcon className="m-1 text-white" />
         </div>

         <div>
           <h5 className="para textheader ps-2 mb-0 ">Federal holiday</h5>
         </div>
       </div>
     </div>
     <div className="col-lg-12 col-xxl-2 mt-3">
       <div className="d-flex align-items-center">
         <div
           className="headingicons rounded"
           style={{
             background: "#6C63FF",
             height: "fit-content",
             width: "fit-content",
           }}
         >
           <DownhillSkiingOutlinedIcon className="m-1 text-white" />
         </div>

         <div>
           <h5 className="para textheader ps-2 mb-0 "> Vacation policy</h5>
         </div>
       </div>
     </div>
     <div className="col-lg-12 col-xxl-2 mt-3">
       <div className="  d-flex align-items-center">
         <div
           className="headingicons rounded"
           style={{
             background: "#FF6970",
             height: "fit-content",
             width: "fit-content",
           }}
         >
           <PersonAddAltOutlinedIcon className="m-1 text-white" />
         </div>

         <div>
           <h5 className="para textheader ps-2 mb-0 ">Recruitment process</h5>
         </div>
       </div>
     </div>
     <div className="col-lg-12 col-xxl-2 mt-3">
       <div className="  d-flex align-items-center">
         <div
           className="headingicons rounded"
           style={{
             background: "#16B1FF",
             height: "fit-content",
             width: "fit-content",
           }}
         >
           <ApartmentOutlinedIcon className="m-1 text-white" />
         </div>

         <div>
           <h5 className="para textheader ps-2 mb-0 ">Marvel</h5>
         </div>
       </div>
     </div>
     <div className="col-lg-12 col-xxl-2 mt-3">
       <div className="  d-flex align-items-center">
         <div
           className="headingicons rounded"
           style={{
             background: "#FFB054",
             height: "fit-content",
             width: "fit-content",
           }}
         >
           <AutoStoriesOutlinedIcon className="m-1 text-white" />
         </div>

         <div>
           <h5 className="para textheader ps-2 mb-0 ">Handbook</h5>
         </div>
       </div>
     </div>
   </div>
:    

    <div>
      <div className="col-lg-12 col-xxl-6 mt-3">
        <div className="d-flex align-items-center">
          <div
            className="headingicons rounded"
            style={{
              background: "#FFCC5F",
              height: "fit-content",
              width: "fit-content",
            }}
          >
            <AccountBalanceOutlinedIcon className="m-1 text-white" />
          </div>

          <div>
            <h5 className="para textheader ps-2 mb-0 ">Federal holiday</h5>
          </div>
        </div>
      </div>
      <div className="col-lg-12 col-xxl-6 mt-3">
        <div className="d-flex align-items-center">
          <div
            className="headingicons rounded"
            style={{
              background: "#6C63FF",
              height: "fit-content",
              width: "fit-content",
            }}
          >
            <DownhillSkiingOutlinedIcon className="m-1 text-white" />
          </div>

          <div>
            <h5 className="para textheader ps-2 mb-0 "> Vacation policy</h5>
          </div>
        </div>
      </div>
      <div className="col-lg-12 col-xxl-6 mt-3">
        <div className="  d-flex align-items-center">
          <div
            className="headingicons rounded"
            style={{
              background: "#FF6970",
              height: "fit-content",
              width: "fit-content",
            }}
          >
            <PersonAddAltOutlinedIcon className="m-1 text-white" />
          </div>

          <div>
            <h5 className="para textheader ps-2 mb-0 ">Recruitment process</h5>
          </div>
        </div>
      </div>
      <div className="col-lg-12 col-xxl-6 mt-3">
        <div className="  d-flex align-items-center">
          <div
            className="headingicons rounded"
            style={{
              background: "#16B1FF",
              height: "fit-content",
              width: "fit-content",
            }}
          >
            <ApartmentOutlinedIcon className="m-1 text-white" />
          </div>

          <div>
            <h5 className="para textheader ps-2 mb-0 ">Marvel</h5>
          </div>
        </div>
      </div>
      <div className="col-lg-12 col-xxl-6 mt-3">
        <div className="  d-flex align-items-center">
          <div
            className="headingicons rounded"
            style={{
              background: "#FFB054",
              height: "fit-content",
              width: "fit-content",
            }}
          >
            <AutoStoriesOutlinedIcon className="m-1 text-white" />
          </div>

          <div>
            <h5 className="para textheader ps-2 mb-0 ">Handbook</h5>
          </div>
        </div>
      </div>
    </div>
}
    </>
  );
}

export default Policyprocedure;
