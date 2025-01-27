import React from "react";
import "./loaderanimation.css";
import welcomeAnimationLoader from "@/public/assets/welcome-animation.json";
import Player from "lottie-react";
function Handloader() {
  return (
    <div
      className="d-flex align-items-center justify-content-center w-100 h-100"
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        background: "#4a414187",
        zIndex: "1111111111",
      }}
    >
      {/* <div className="">
        <div className="🤚">
          <div className="👉" />
          <div className="👉" />
          <div className="👉" />
          <div className="👉" />
          <div className="🌴" />
          <div className="👍" />
        </div>
      </div> */}
      <div
          className="animation-container h-100 w-100 d-flex justify-content-center align-items-center"
          style={{ position: "absolute", top: "0px", left: "0px" }}
        >
          <Player
            autoplay
            loop={false} // Stops animation after completing one cycle
            animationData={welcomeAnimationLoader} // Use animationData for the Player
            style={{ height: "50%", width: "50%" }}
          />
        </div>
    </div>
  );
}

export default Handloader;
