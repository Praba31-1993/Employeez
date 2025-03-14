"use client";
import { createSlice } from "@reduxjs/toolkit";

const getInitialBorderColor = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("meetingModeborder") || "#F4F4F4"; 
  }
  return "#F4F4F4"; // Default color for SSR
};

const initialState = {
  background: getInitialBorderColor(),
};

const meetingModeBorderColorSlice = createSlice({
  name: "meetingModeBorder",
  initialState,
  reducers: {
    setMeetingModeBorderColor: (state, action) => {
      if (action.payload.background) {
        state.background = action.payload.background;

        // Save to localStorage only on the client side
        if (typeof window !== "undefined") {
          localStorage.setItem("meetingModeborder", action.payload.background);
        }
      }
    },
  },
});

export const { setMeetingModeBorderColor } = meetingModeBorderColorSlice.actions;
export default meetingModeBorderColorSlice.reducer;
