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
import { LoginApi } from "../api/Listingapis";
import Logintextanimation from "../reusableComponent/logintextanimation";
import { initializeRole } from "../redux/slices/roleSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { User } from "../reusableComponent/interfacetypes";
import { useRouter } from "next/navigation";
import { Timeloader } from "../reusableComponent/loader/timeloader";

export default function Login() {
  const useColors = Colors();
  const loginanimationData = require("@/public/assets/EmployEz-login-animation.json");

  const [userDetails, setUserDetails] = useState<User>();
  const [checked, setChecked] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ userId: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [showPassword, setShowPassword] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const role = useSelector((state: RootState) => state.role.role);
  const router = useRouter();

  useEffect(() => {
    const rememberedUserId = localStorage.getItem("rememberedUserId");
    const rememberedUserPassword = localStorage.getItem(
      "rememberedUserPassword"
    );
    if (rememberedUserId && rememberedUserPassword) {
      setUserId(rememberedUserId);
      setPassword(rememberedUserPassword);
      setChecked(true);
    } else {
      setUserId("");
      setPassword("");
      setChecked(false);
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
    if (e.target.checked === false) {
      localStorage.removeItem("rememberedUserId");
      localStorage.removeItem("rememberedUserPassword");
    }
  };

  const handleSubmit = async () => {
    // Validate user inputs
    const userIdError = validateUserId(userId);
    const passwordError = validatePassword(password);
  
    // Set errors for form fields
    setErrors({ userId: userIdError, password: passwordError });
  
    if (!userIdError && !passwordError) {
      // Remember user credentials if the checkbox is checked
      if (checked) {
        localStorage.setItem("rememberedUserId", userId);
        localStorage.setItem("rememberedUserPassword", password);
      }
  
      const params = {
        usernameOrEmail: userId,
        password: password,
      };
  
      // Set loading state to true
      setIsLoading(true);
  
      try {
        // Call the login API
        const loginResponse = await LoginApi(params);
  
        // Handle a successful login
        if (loginResponse.status === 200) {
          toast.success("Login successful");
          setUserDetails(loginResponse.data.userInfo);
          document.cookie = "auth=true; path=/; max-age=86400";
  
          // Delay to display loader for at least 3 seconds
          setTimeout(() => {
            router.push("/dashboard");
            setIsLoading(false); // Stop loading after navigation
          }, 3000);
        } 
        // Handle other responses or errors
        else if (loginResponse.status === 500) {
          toast.error("Internal Server Error. Please try again later.");
          setIsLoading(false);
        } else {
          toast.error("Invalid credentials. Please try again.");
          setIsLoading(false);
        }
      } catch (error) {
        // Handle unexpected errors
        toast.error("Invalid credentials. Please try again.");
        setIsLoading(false);
      }
    }
  };
  
  
  useEffect(() => {
    if (userDetails !== undefined) {
      console.log("userDetaos", userDetails);

      dispatch(initializeRole(userDetails));
    }
  }, [userDetails, role]);

  return (
    <section className="login">
      {/* Show Timeloader while loading */}
      {isLoading && <Timeloader />}
      <div className="container-fluid px-0 d-flex align-items-center justify-content-center h-100">
        <div className="row h-100 w-100">
          <div
            className="col-md-6  p-0 d-sm-flex d-none align-items-center flex-column  h-100 justify-content-center"
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
                  <p className="error-text mt-1">{errors.userId}</p>
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
                  <p className="error-text mt-1">{errors.password}</p>
                )}

                <div className="d-flex align-items-center justify-content-between  mt-3 ">
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          cursor: "pointer",
                          "&.Mui-checked": {
                            color: useColors.themeRed,
                          },
                        }}
                        onChange={(e) => handleChangeCheckbox(e)}
                        checked={checked}
                      />
                    }
                    label="Remember Me"
                  />

                  <Link
                    href="./forget_password"
                    className="forgetpassword para"
                  >
                    {" "}
                    Forget password?
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
