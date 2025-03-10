"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bunit: "", // Initial empty state
};

const bunitSlice = createSlice({
  name: "businessunit",
  initialState,
  reducers: {
    setBunit: (state, action) => {
      state.bunit = action.payload; // Directly update with the provided value
    },
  },
});

export const { setBunit } = bunitSlice.actions;
export default bunitSlice.reducer;
