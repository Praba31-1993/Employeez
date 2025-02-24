"use client";
import Link from "next/link";
import Image from "next/image";
import logogif from "/assets/img/loginanimation.gif";
import logo from "@/public/assets/imgemployeez.png";
import * as React from "react";
import Player from "lottie-react";
import { Colors } from "../reusableComponent/styles";
import Logintextanimation from "../reusableComponent/logintextanimation";
import ImageComponent from "../reusableComponent/image";

export default function FirstTimepassword() {
  const useColors = Colors();
  const loginanimationData = require("@/public/assets/EmployEz-login-animation.json");
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <section className="login">
      <div className="container-fluid px-0 d-flex align-items-center justify-content-center h-100">
        <div className="row h-100 w-100">
          <div
            className="col-md-6 d-sm-flex d-none p-0  align-items-center flex-column  h-100 justify-content-center"
            style={{ background: useColors.themeRed }}
          >
            <h1 className="heading fw-bold text-center py-3 text-white">
              HR on Cloud
            </h1>
            <Player
              autoplay
              loop={true} // Stops animation after completing one cycle
              animationData={loginanimationData} // Use animationData for the Player
              style={{ height: "60%", width: "60%" }}
            />
            <Logintextanimation />
          </div>
          <div className="col-sm-6 align-items-center  d-flex">
            <div className="logincard ps-md-5 ms-md-5">
              <div className="logo">
                <Image src={logo} alt={""} />

                {/* <ImageComponent width={0}  height={0} user={"/assets/img/employeez.png"} /> */}
              </div>
              <h4 className="heading d-flex align-items-center pt-4">
                First-time password update
              </h4>
              <p className="shade para pt-1">Please setup your password</p>
              <div className="form_filed">
                <input
                  className="ps-3 py-2 mt-2"
                  type="text"
                  placeholder="Current password"
                />
                <input
                  className="ps-3 py-2 mt-2"
                  type="text"
                  placeholder="New password"
                />
                <input
                  className="ps-3 py-2 mt-2"
                  type="text"
                  placeholder="Conform password"
                />
                <div className="orangebtn mt-3 py-1 text-center"  style={{ cursor: "pointer", width: "100%" , background: useColors.themeRed}}>
                  Set password
                </div>
              </div>
              <div className="row pt-2">
                <div className="col-12" style={{ alignSelf: "center" }}>
                  <p className="forgetpassword mb-0 para text-end">
                    <Link href="./logincomponent">Revisit Login</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
