import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Outlinebutton from "../../reusableComponent/outlinebtn";
import { Colors } from "@/app/reusableComponent/styles";
import ImageComponent from "@/app/reusableComponent/image";

function Needhelp() {
  const [loading, setLoading] = useState(true);
  const useColors = Colors();

  useEffect(() => {
    // Simulate a delay for data loading
    const timer = setTimeout(() => setLoading(false), 2000); // Adjust the delay as necessary
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        // Skeleton Loader
        <>
          <div className="d-flex justify-content-between">
            <Skeleton width={150} height={25} />
            <Skeleton circle={true} height={40} width={40} />
          </div>
          <Skeleton width={300} height={20} className="mt-2 mb-3" />
          <Skeleton width={120} height={40} />
        </>
      ) : (
        // Actual Content
        <>
          <div className="d-flex justify-content-between">
            <p className="textheader heading2 fw-bold">Need help?</p>
            <ImageComponent
              width={0}
              height={0}
              user={"/assets/img/help.svg"}
            />
          </div>
          <p className="para shade">
            Do you face any problem while using EmployEz?
          </p>
          <Outlinebutton
            color={useColors.white}
            border={`1px solid ${useColors.themeRed}`}
            text="Contact us"
            fontSize="12px"
            background={useColors.themeRed}
            iscontactus={true}
          />
        </>
      )}
    </>
  );
}

export default Needhelp;
