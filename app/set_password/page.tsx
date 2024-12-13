"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/img/employeez.png";
import * as React from "react";
import Player from "lottie-react";
import { Colors } from "../reusableComponent/styles";
import Logintextanimation from "../reusableComponent/logintextanimation";
import ImageComponent from "../reusableComponent/image";

export default function Setpassword() {
  const useColors = Colors();
  const loginanimationData = require("@/public/assets/EmployEz-login-animation.json");

  // State for form fields
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  // Handle password field changes
  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!newPassword || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Clear error and submit the form
    setError(null);
    // Add API call or navigation here
  };

  return (
    <section className="login">
      <div className="container-fluid px-0 d-flex align-items-center justify-content-center h-100">
        <div className="row h-100 w-100">
          <div
            className="col-md-6 logogif p-0 d-flex align-items-center flex-column h-100 justify-content-center"
            style={{ background: useColors.themeRed }}
          >
            <h1 className="heading fw-bold text-center py-3 text-white">
              HR on Cloud
            </h1>
            <Player
              autoplay
              loop={true}
              animationData={loginanimationData}
              style={{ height: "60%", width: "60%" }}
            />
            <Logintextanimation />
          </div>
          <div className="col-sm-6 align-items-center d-flex">
            <div className="logincard ps-md-5 ms-md-5">
              <div className="logo">
                <Image src={logo} alt="Logo" />
                {/* <ImageComponent width={0}  height={0} user={"/assets/img/lock.png"}/> */}
              </div>
              <h4 className="heading d-flex align-items-center pt-4">
                Setup password
              </h4>
              <p className="shade para pt-1">Please setup your password</p>
              <div className="form_filed">
                <input
                  className="ps-3 py-2 mt-2"
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                <input
                  className="ps-3 py-2 mt-3"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {error && (
                  <p
                    className="text-danger mt-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {error}
                  </p>
                )}
                <button
                  className="mutlicolourbtn mt-2 py-1 text-center"
                  onClick={handleSubmit}
                  disabled={true}
                  style={{ width: "100%" }}
                >
                  Reset password
                </button>
              </div>
              <div className="row pt-2">
                <div className="col-12" style={{ alignSelf: "center" }}>
                  <p className="forgetpassword mb-0 para text-end">
                    <Link href="./login">Revisit Login</Link>
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
