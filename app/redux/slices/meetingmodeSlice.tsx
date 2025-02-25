"use client";
import { createSlice } from "@reduxjs/toolkit";

const meetingModeBorder =
  localStorage.getItem("meetingModeborder") || "#FF7074"; // Default to #FF7074 if null

const initialState = {
  border: `1px solid ${meetingModeBorder}`,
};

const meetingModeBorderColorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setMeetingModeBorderColor: (state, action) => {
      if (action.payload.border) state.border = action.payload.border;
    },
  },
});

export const { setMeetingModeBorderColor } =
  meetingModeBorderColorSlice.actions;
export default meetingModeBorderColorSlice.reducer;
