"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/img/employeez.png";
import lock from "@/public/assets/img/lock.png";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Player from "lottie-react";
import { Colors } from "../reusableComponent/styles";
import Logintextanimation from "../reusableComponent/logintextanimation";
import { validateField } from "../reusableComponent/validation";
import ImageComponent from "../reusableComponent/image";

export default function forgetpassword() {
  const loginanimationData = require("@/public/assets/EmployEz-login-animation.json");
  const [otpVisible, setOtpVisible] = useState(false);
  const [emailOrPassword, setEmailOrPassword] = useState<string>("");
  const [emailOrPasswordError, setEmailOrPasswordError] = useState<string>("");
  const [timer, setTimer] = useState(30); // Timer state initialized to 30 seconds
  const router = useRouter();
  const useColors = Colors();
  // Timer effect
  useEffect(() => {
    if (otpVisible && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      // Clear interval on unmount or when timer reaches 0
      return () => clearInterval(countdown);
    }
  }, [otpVisible, timer]);

  // Handler for Verify button click
  const handleVerifyClick = () => {
    const error = validateField(emailOrPassword);
    setEmailOrPasswordError(error);
    if (!error) {
      setOtpVisible(true);
      setTimer(30); // Reset timer when OTP is shown
    }
  };

  // Function to be executed when the button is clicked
  const handleClick = () => {
    router.push("/set_password");
  };
  // State to control visibility of OTP input and Verify button

  return (
    <section className="login">
      <div className="container-fluid px-0 d-flex align-items-center justify-content-center h-100">
        <div className="row h-100 w-100">
          <div
            className="col-md-6 logogif p-0 d-flex align-items-center flex-column  h-100 justify-content-center"
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
                {/* <ImageComponent width={0}  height={0} user={"/assets/img/employeez.png"}/> */}
              </div>
              <h4 className="heading d-flex align-items-center pt-4">
                Forgot password
                <Image src={lock} className="" alt={""} />
                {/* <ImageComponent width={0}  height={0} user={"/assets/img/lock.png"}/> */}

              </h4>
              <p className="shade para pt-1">
                Please enter your registered email or mobile no{" "}
              </p>
              <div className="form_filed">
                {/* Email/Phone input */}
                <input
                  className="ps-3 py-2 mt-2"
                  type="text"
                  placeholder="Enter your Verified email or Number"
                  value={emailOrPassword}
                  onChange={(e) => setEmailOrPassword(e.target.value)}
                />
                {emailOrPasswordError && (
                  <p className="error-text mt-1">{emailOrPasswordError}</p>
                )}

                {/* Conditionally render OTP input based on otpVisible */}
                {otpVisible && (
                  <input
                    className="ps-3 py-2 mt-2"
                    type="text"
                    placeholder="Enter OTP"
                  />
                )}

                {/* Link to resend OTP, shown when OTP is visible */}
                {otpVisible && (
                  <div className=" pt-2 text-end timer">
                    <h6 className="para mb-0 shade ">
                      {timer > 0
                        ? `00:${timer < 10 ? `0${timer}` : timer}`
                        : ""}
                    </h6>
                    <p className="forgetpassword mb-0 para text-end">
                      {timer === 0 && (
                        <Link href={""}>
                          <FontAwesomeIcon icon={faRotateLeft} /> Resend OTP
                        </Link>
                      )}
                    </p>
                  </div>
                )}

                {/* Verify button only shown when OTP is not visible */}
                {!otpVisible && (
                  <button
                    className="mutlicolourbtn mt-3 py-1 text-center" 
                    onClick={handleVerifyClick} // Trigger the state change on click
                    style={{ cursor: "pointer", width: "100%" , background: useColors.themeRed}}
                  >
                    Continue
                  </button>
                )}

                {otpVisible && (
                  <div
                    className="mutlicolourbtn mt-3 py-1 text-center"
                    style={{ cursor: "pointer", background: useColors.themeRed }}
                    onClick={handleClick}
                  >
                    Verify OTP
                  </div>
                )}
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
