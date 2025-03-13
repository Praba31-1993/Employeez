"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/img/employeez.png";
import handwave from "@/public/assets/img/hi.png";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  validateUserId,
  validatePassword,
} from "../reusableComponent/validation";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Player from "lottie-react";
import { Colors } from "../reusableComponent/styles";
import Logintextanimation from "../reusableComponent/logintextanimation";
import { initializeRole } from "../redux/slices/roleSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { User } from "../reusableComponent/interfacetypes";
import { useRouter } from "next/navigation";
import { loginUser } from "../redux/slices/loginSlice";
import { Timeloader } from "../reusableComponent/loader/timeloader";
import { setBunit } from "../redux/slices/bunitSlice";

export default function Login() {
  const useColors = Colors();
  const loginanimationData = require("@/public/assets/EmployEz-login-animation.json");
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [checked, setChecked] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ userId: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginToken, setLoginToken] = useState();
  const [loginfirstName, setLoginfirstName] = useState();
  const [loginlastName, setLoginlastName] = useState();
  const [loginrole, setLoginRole] = useState();
  const [loginbunit, setLoginBunit] = useState();
  const [role, setRole] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  // ✅ Use `useEffect` for accessing localStorage safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = window.localStorage.getItem("Role");
      setRole(storedRole || null);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      // 👈 Prevent SSR errors
      const rememberedUserId = localStorage.getItem("rememberedUserId") || "";
      const rememberedUserPassword =
        localStorage.getItem("rememberedUserPassword") || "";

      setUserId(rememberedUserId);
      setPassword(rememberedUserPassword);
      setChecked(!!(rememberedUserId && rememberedUserPassword));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "usernameOrEmail") setUserId(value);
    if (name === "password") setPassword(value);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);

    if (typeof window !== "undefined") {
      if (e.target.checked) {
        localStorage.setItem("rememberedUserId", userId);
        localStorage.setItem("rememberedUserPassword", password);
      } else {
        localStorage.removeItem("rememberedUserId");
        localStorage.removeItem("rememberedUserPassword");
      }
    }
  };

  const handleSubmit = async () => {
    const userIdError = validateUserId(userId);
    const passwordError = validatePassword(password);
  
    setErrors({ userId: userIdError, password: passwordError });
  
    if (!userIdError && !passwordError) {
      const params = {
        usernameOrEmail: userId,
        password: password,
      };
  
      setIsLoading(true);
      const loginResponse = await dispatch(loginUser(params));
      dispatch(initializeRole(loginResponse.payload.userInfo));
  
      if (loginResponse.payload.status === undefined) {
        setUserDetails(loginResponse.payload.userInfo);
        dispatch(setBunit({ bunit: loginResponse.payload.userInfo.businessUnit }));
        toast.success("Login successful");
  
        // ✅ Store data in localStorage only if available
        if (typeof window !== "undefined") {
          localStorage.setItem("token", loginResponse.payload.token);
          localStorage.setItem("Firstname", loginResponse.payload.userInfo.firstName);
          localStorage.setItem("Lastname", loginResponse.payload.userInfo.lastName);
          localStorage.setItem("Role", loginResponse.payload.userInfo.role);
          localStorage.setItem("bunit", loginResponse.payload.userInfo.businessUnit);
        }
  
        setTimeout(() => {
          setIsLoading(false);
          router.push("/dashboard");
        }, 2000);
      } else {
        toast.error("Invalid credentials. Please try again.");
        setIsLoading(false);
      }
    }
  };
  

  return (
    <section className="login">
      {isLoading && <Timeloader />}
      <div className="container-fluid px-0 d-flex align-items-center justify-content-center h-100">
        <div className="row h-100 w-100">
          <div
            className="col-md-6 p-0 d-sm-flex d-none align-items-center flex-column h-100 justify-content-center"
            style={{ background: useColors.themeRed }}
          >
            <h1 className="heading fw-bold text-center py-3 text-white">
              HR on Cloud
            </h1>
            <Player
              autoplay
              loop
              animationData={loginanimationData}
              style={{ height: "60%", width: "60%" }}
            />
            <Logintextanimation />
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="logincard">
              <div className="logo text-center">
                <Image src={logo} alt="EmployEZ Logo" />
              </div>
              <h4 className="heading d-flex align-items-center pt-4">
                Welcome to EmployEZ!{" "}
                <Image src={handwave} className="ms-2" alt="Wave" />
              </h4>
              <p className="shade para pt-1">
                Please sign in to your account and start the adventure.
              </p>

              <div className="form_filed">
                <input
                  className="ps-3 py-2 mt-2"
                  type="text"
                  placeholder="User ID"
                  name="usernameOrEmail"
                  value={userId}
                  onChange={handleInputChange}
                />
                {errors.userId && (
                  <p className="error-text mb-0 para mt-1">{errors.userId}</p>
                )}

                <div style={{ position: "relative" }}>
                  <input
                    className="ps-3 py-2 mt-3"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                  {showPassword ? (
                    <VisibilityOutlinedIcon
                      sx={{
                        position: "absolute",
                        right: "10px",
                        top: "1.1em",
                        cursor: "pointer",
                        color: "grey",
                      }}
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      sx={{
                        position: "absolute",
                        right: "10px",
                        top: "1.1em",
                        cursor: "pointer",
                        color: "grey",
                      }}
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
                {errors.password && (
                  <p className="error-text mb-0 para mt-1">{errors.password}</p>
                )}

                <div className="d-flex align-items-center justify-content-between mt-3">
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          cursor: "pointer",
                          "&.Mui-checked": { color: useColors.themeRed },
                        }}
                        checked={checked}
                        onChange={handleChangeCheckbox}
                      />
                    }
                    label="Remember Me"
                  />
                  <Link
                    href="./forget_password"
                    className="forgetpassword para"
                  >
                    {" "}
                    Forget password?{" "}
                  </Link>
                </div>
                <div
                  className="mutlicolourbtn mt-3 py-2 text-center"
                  onClick={handleSubmit}
                  style={{ background: useColors.themeRed }}
                >
                  {" "}
                  Login{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
