"use client";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./about.css";
import Handloader from "../reusableComponent/loader/handloader";
function About() {
  return (
    <div className="text-center m-auto d-flex justify-content-center">
       <button className="button2">
        <span>Button</span>
        <ArrowForwardIcon />
        <Handloader/>
       </button>
    </div>
  );
}

export default About;
