"use client";
import React, { useEffect, useState } from "react";

function Page() {
  const [auth, setAuth] = useState<String | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(token);
    console.log("auth", token);
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  return <div>Page</div>;
}

export default Page;
