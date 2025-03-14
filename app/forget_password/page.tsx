"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import logo from "@/public/assets/img/employeez.png";
import lock from "@/public/assets/img/lock.png";
import { Colors } from "../reusableComponent/styles";
import { validateField } from "../reusableComponent/validation";

// ⏬ Dynamic Imports (SSR Disabled)
const Player = dynamic(() => import("lottie-react"), { ssr: false });
const Logintextanimation = dynamic(() => import("../reusableComponent/logintextanimation"), { ssr: false });

export default function ForgetPassword() {
  const loginanimationData = require("@/public/assets/EmployEz-login-animation.json");
  const router = useRouter();
  const useColors = Colors();

  const [otpVisible, setOtpVisible] = useState(false);
  const [emailOrPassword, setEmailOrPassword] = useState<string>("");
  const [emailOrPasswordError, setEmailOrPasswordError] = useState<string>("");
  const [timer, setTimer] = useState<number>(30);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("Role");
      setRole(storedRole || null);
    }
  }, []);

  // Timer logic when OTP is visible
  useEffect(() => {
    if (otpVisible && timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [otpVisible, timer]);

  // Handle verification button click
  const handleVerifyClick = () => {
    const error = validateField(emailOrPassword);
    setEmailOrPasswordError(error);
    if (!error) {
      setOtpVisible(true);
      setTimer(30);
    }
  };

  return (
    <section className="login">
      <div className="container-fluid px-0 d-flex align-items-center justify-content-center h-100">
        <div className="row h-100 w-100">
          {/* Left Section (Animation & Text) */}
          <div
            className="col-md-6 d-none d-md-flex flex-column align-items-center justify-content-center p-0"
            style={{ background: useColors.themeRed }}
          >
            <h1 className="heading fw-bold text-center py-3 text-white">HR on Cloud</h1>
            <Player autoplay loop animationData={loginanimationData} style={{ height: "60%", width: "60%" }} />
            <Logintextanimation />
          </div>

          {/* Right Section (Form) */}
          <div className="col-md-6 d-flex align-items-center">
            <div className="logincard ps-md-5 ms-md-5">
              <div className="logo">
                <Image src={logo} alt="Employeez Logo" />
              </div>
              <h4 className="heading d-flex align-items-center pt-4">
                Forgot password <Image src={lock} alt="Lock Icon" />
              </h4>
              <p className="shade para pt-1">Please enter your registered email or mobile no</p>

              {/* Input Fields */}
              <div className="form_filed">
                <input
                  className="ps-3 py-2 mt-2"
                  type="text"
                  placeholder="Enter your Verified email or Number"
                  value={emailOrPassword}
                  onChange={(e) => setEmailOrPassword(e.target.value)}
                />
                {emailOrPasswordError && <p className="error-text mt-1">{emailOrPasswordError}</p>}

                {/* OTP Field */}
                {otpVisible && (
                  <input className="ps-3 py-2 mt-2" type="text" placeholder="Enter OTP" />
                )}

                {/* Resend OTP Logic */}
                {otpVisible && (
                  <div className="pt-2 text-end timer">
                    <h6 className="para mb-0 shade">
                      {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : ""}
                    </h6>
                    {timer === 0 && (
                      <p className="forgetpassword mb-0 para text-end">
                        <Link href={""}>
                          <FontAwesomeIcon icon={faRotateLeft} /> Resend OTP
                        </Link>
                      </p>
                    )}
                  </div>
                )}

                {/* Buttons */}
                {!otpVisible ? (
                  <button
                    className="mutlicolourbtn mt-3 py-1 w-100"
                    onClick={handleVerifyClick}
                    style={{ background: useColors.themeRed }}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    className="mutlicolourbtn mt-3 py-1 w-100"
                    onClick={() => router.push("/set_password")}
                    style={{ background: useColors.themeRed }}
                  >
                    Verify OTP
                  </button>
                )}
              </div>

              {/* Revisit Login Link */}
              <div className="row pt-2">
                <div className="col-12 text-end">
                  <p className="forgetpassword mb-0 para">
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
