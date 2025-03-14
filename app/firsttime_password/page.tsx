"use client";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import logo from "@/public/assets/img/employeez.png";
import React, { useEffect, useState } from "react";
import { Colors } from "../reusableComponent/styles";

// ⏬ Dynamic Imports (SSR Disabled)
const Player = dynamic(() => import("lottie-react"), { ssr: false });
const Logintextanimation = dynamic(() => import("../reusableComponent/logintextanimation"), {
  ssr: false,
});

export default function FirstTimepassword() {
  const useColors = Colors();
  const loginanimationData = require("@/public/assets/EmployEz-login-animation.json");
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.getItem("Role");
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <section className="login">
      <div className="container-fluid px-0 d-flex align-items-center justify-content-center h-100">
        <div className="row h-100 w-100">
          {/* Left Side - Animation */}
          <div
            className="col-md-6 d-sm-flex d-none p-0 align-items-center flex-column h-100 justify-content-center"
            style={{ background: useColors.themeRed }}
          >
            <h1 className="heading fw-bold text-center py-3 text-white">HR on Cloud</h1>
            <Player
              autoplay
              loop
              animationData={loginanimationData}
              style={{ height: "60%", width: "60%" }}
            />
            <Logintextanimation />
          </div>

          {/* Right Side - Form */}
          <div className="col-sm-6 align-items-center d-flex">
            <div className="logincard ps-md-5 ms-md-5">
              <div className="logo">
                <Image src={logo} alt="Company Logo" />
              </div>

              <h4 className="heading d-flex align-items-center pt-4">First-time password update</h4>
              <p className="shade para pt-1">Please setup your password</p>

              <div className="form_filed">
                <input className="ps-3 py-2 mt-2" type="password" placeholder="Current password" />
                <input className="ps-3 py-2 mt-2" type="password" placeholder="New password" />
                <input className="ps-3 py-2 mt-2" type="password" placeholder="Confirm password" />

                <div
                  className="orangebtn mt-3 py-1 text-center"
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    background: useColors.themeRed,
                  }}
                >
                  Set password
                </div>
              </div>

              <div className="row pt-2">
                <div className="col-12 text-end">
                  <p className="forgetpassword mb-0 para">
                    <Link href="/logincomponent">Revisit Login</Link>
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
