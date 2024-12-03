"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/img/employeez.png";
import handwave from "../assets/img/hi.png";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	validateUserId,
	validatePassword,
} from "../reusableComponent/validation";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "../assets/img/login.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import Player from "lottie-react";
import { Colors } from "../reusableComponent/styles";
import { LoginApi } from "../api/Listingapis";


export default function Login() {
	const useColors = Colors(); 
	const loginanimationData = require("../assets/EmployEz-login-animation.json");
	const [checked, setChecked] = useState(false);
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({ userId: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const rememberedUserId = localStorage.getItem("rememberedUserId");
		if (rememberedUserId) {
			setUserId(rememberedUserId);
			setChecked(true);
		}
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "userId") setUserId(value);
		if (name === "password") setPassword(value);
	};

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked);
	};

	const handleSubmit = () => {
		const userIdError = validateUserId(userId);
		const passwordError = validatePassword(password);

		setErrors({ userId: userIdError, password: passwordError });

		if (!userIdError && !passwordError) {
			if (checked) {
				localStorage.setItem("rememberedUserId", userId);
			}
			document.cookie = "auth=true; path=/; max-age=86400";
			toast.success("Login successful!");
			router.push("/dashboard");
			
			const params = {
				usernameOrEmail: "adm07",
				password: "Test123",
			  };
			  
			  LoginApi(params)
		}
	};

	return (
		<section className="login">
			<div className="container-fluid px-0 d-flex align-items-center justify-content-center h-100">
				<div className="row h-100 w-100">
					<div className="col-md-6 logogif p-0 d-flex align-items-center flex-column  h-100 justify-content-center" style={{background:useColors.themeRed}}>
						<h1 className="heading fw-bold text-center py-3 text-white">HR on Cloud</h1>
						<Player
							autoplay
							loop={true} // Stops animation after completing one cycle
							animationData={loginanimationData} // Use animationData for the Player
							style={{ height: "80%", width: "80%" }} />
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
									name="userId"
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
											<Checkbox defaultChecked
												sx={{
													cursor:'pointer',
													'&.Mui-checked': {
														color: useColors.themeRed, // Changes the checkmark color
													}
												}} />
										} label="Remember Me" />

									<Link href="./forget_password" className="forgetpassword para"> Forget password?</Link>
								</div>
								<div className="mutlicolourbtn mt-3 py-2 text-center" onClick={handleSubmit} > Login </div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer />
		</section>
	);
}
