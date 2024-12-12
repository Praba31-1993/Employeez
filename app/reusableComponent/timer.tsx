"use client";
import React, { useState, useRef, useEffect } from "react";

function Timer({ starttime,timevalue }: any) {
  // State to store time
  const [time, setTime] = useState(0); // total time in seconds
  const intervalRef = useRef<number | null>(null); // store interval ID

  // Function to start the timer
  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  // Function to stop the timer
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // reset the interval ref
    }
  };

  // Function to reset the timer
  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };

  // Format time into hh:mm:ss
  const hours = String(Math.trunc(time / 3600)).padStart(2, "0");

  const minutes = String(Math.trunc((time % 3600) / 60)).padStart(2, "0");

  const seconds = String(time % 60).padStart(2, "0");

  useEffect(() => {
    startTimer();
    return () => stopTimer(); // cleanup on unmount
  }, [starttime]);


  useEffect(() => {
    timevalue(`${hours}:${minutes}:${seconds}`);
  }, [time]); 

  return (
    <div>
      <span className="timer" style={{ fontSize: "2rem", fontWeight: "bold" }}>
        {`${hours}:${minutes}:${seconds}`}
      </span>
    </div>
  );
}

export default Timer;
