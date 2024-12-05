"use client";
import Link from "next/link";
import Image from "next/image";
import logogif from "../assets/img/loginanimation.gif";
import logo from "../assets/img/employeez.png";
import * as React from "react";
import "../assets/img/login.css";
import Player from "lottie-react";
import { Colors } from "../reusableComponent/styles";
import Logintextanimation from "../reusableComponent/logintextanimation";


export default function Setpassword() {
    const useColors = Colors();
    const loginanimationData = require("../assets/EmployEz-login-animation.json");
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    return (
        <section className="login">
            <div className="container-fluid px-0 d-flex align-items-center justify-content-center h-100">
            <div className="row h-100 w-100">
					<div className="col-md-6 logogif p-0 d-flex align-items-center flex-column  h-100 justify-content-center" style={{ background: useColors.themeRed }}>
						<h1 className="heading fw-bold text-center py-3 text-white">HR on Cloud</h1>
						<Player
							autoplay
							loop={true} // Stops animation after completing one cycle
							animationData={loginanimationData} // Use animationData for the Player
							style={{ height: "60%", width: "60%" }} />
						<Logintextanimation />

					</div>
                    <div className="col-sm-6 align-items-center  d-flex">
                        <div className="logincard ps-md-5 ms-md-5">
                            <div className="logo">
                                <Image src={logo} alt={""} />
                            </div>
                            <h4 className="heading d-flex align-items-center pt-4">
                                Setup password{" "}
                            </h4>
                            <p className="shade para pt-1">Please setup your password</p>
                            <div className="form_filed">
                                <input
                                    className="ps-3 py-2 mt-2"
                                    type="text"
                                    placeholder="New password"
                                />
                                <input
                                    className="ps-3 py-2 mt-3"
                                    type="text"
                                    placeholder="Conform password"
                                />
                                <div className="mutlicolourbtn mt-2 py-1 text-center">
                                    Reset password
                                </div>
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
