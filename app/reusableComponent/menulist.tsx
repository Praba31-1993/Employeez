import React, { useState, useEffect } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ImageComponent from "./image";
import { Colors } from "./styles";

function Menulistitem() {
  const useColors = Colors();
  const [loading, setLoading] = useState(true);

  // Store localStorage data in state
  const [userData, setUserData] = useState({
    Firstname: "",
    Lastname: "",
    Role: "",
  });

  useEffect(() => {
    const Firstname = localStorage.getItem("Firstname") || "Guest";
    const Lastname = localStorage.getItem("Lastname") || "";
    const Role = localStorage.getItem("Role") || "User";

    setUserData({ Firstname, Lastname, Role });

    // Simulating a fetch delay for demo purposes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="approverlist align-items-center d-flex mt-2">
      {loading ? (
        <>
          {/* Skeleton Loading UI */}
          <div className="userimages">
            <Skeleton circle={true} height={40} width={40} />
          </div>
          <div className="roles ps-2">
            <Skeleton height={20} width={120} className="mb-1 ms-2" />
            <Skeleton height={16} width={80} className="mb-1 ms-2" />
            <p
              className="mb-0 cursorPointer para pe-3 d-sm-none d-block"
              style={{ color: useColors.themeRed }}
            >
              <Skeleton height={16} width={80} className="mb-1 ms-2" />
            </p>
          </div>
        </>
      ) : (
        <>
          {/* Render Actual Content */}
          <div className="userimages">
            <ImageComponent
              width={50}
              height={50}
              user={"/assets/img/Ellipse 14.svg"}
            />
          </div>
          <div className="roles ps-2">
            <h5 className="para textheader mb-0">
              {userData.Firstname} {userData.Lastname}
            </h5>
            <p className="para2 mb-0 mt-1 shade">
              {userData.Role === "E"
                ? "Employee"
                : userData.Role === "SA"
                ? "Super Admin"
                : userData.Role}
            </p>
            <p
              className="mb-0 cursorPointer para pe-3 d-sm-none d-block"
              style={{ color: useColors.themeRed }}
            >
              Supervisee
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Menulistitem;
