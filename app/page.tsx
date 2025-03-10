"use client";
import Player from "lottie-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const animationData = require("@/public/assets/EZ animation.json"); // Ensure JSON path is correct

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("./login"); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      className="animation-container h-100 w-100 d-flex justify-content-center align-items-center"
      style={{ position: "absolute", top: "0px", left: "0px" }}
    >
      <Player
        autoplay
        loop={false} // Stops animation after completing one cycle
        animationData={animationData} // Use animationData for the Player
        style={{ height: "50%", width: "50%" }}
      />
    </div>
  );
}
