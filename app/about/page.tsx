"use client";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./about.css";
function About() {
  return (
    <div className="text-center m-auto d-flex justify-content-center" >
      <button className="button" role="button">
        Button <ArrowForwardIcon className="arrow"/>
      </button>
    </div>
  );
}

export default About;
