// src/redux/slices/modeSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "system", // Default to "system" mode
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;
