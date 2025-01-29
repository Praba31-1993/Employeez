"use client";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./about.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function About() {
  return (
    <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">Action</a></li>
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
  );
}

export default About;

