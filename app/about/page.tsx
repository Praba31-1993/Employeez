import React from "react";
import Sidebar from "../sidebar/page";
import Contacts from "../dashboard/components/contacts";

function About() {
  return (
    <Sidebar>
      <p>Profile</p>
      <Contacts/>
    
    </Sidebar>
  );
}

export default About;
