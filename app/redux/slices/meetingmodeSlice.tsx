"use client";
import { createSlice } from "@reduxjs/toolkit";

const meetingModeBorder =
  localStorage.getItem("meetingModeborder") ; // Default to #FF7074 if null

const initialState = {
  background: "#F4F4F4",
};

const meetingModeBorderColorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setMeetingModeBorderColor: (state, action) => {
      if (action.payload.background) state.background = action.payload.background;
    },
  },
});

export const { setMeetingModeBorderColor } =
  meetingModeBorderColorSlice.actions;
export default meetingModeBorderColorSlice.reducer;
