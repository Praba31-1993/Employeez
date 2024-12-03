import React from "react";
import Sidebar from "../sidebar/page";
import TestPage from "../expenses/page";

function About() {
  return (
    <Sidebar>
      <p>Profile</p>
      <TestPage />
    </Sidebar>
  );
}

export default About;
