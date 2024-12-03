import Sidebar from "@/app/sidebar/page";
import TestPage from "@/app/expenses/page";
import React from "react";


function Self() {
  return (
    <Sidebar>
      <p>Self</p>
      <TestPage/>
    </Sidebar>
  );
}

export default Self;
