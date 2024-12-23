import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: localStorage.getItem("themeColor") || "#FF7074", // Default to "#FF7074" if no saved color
  border: "0px", // Default border
  shadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.05)", // Default shadow
};


const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColor: (state, action) => {
      if (action.payload.color) state.color = action.payload.color;
      if (action.payload.border) state.border = action.payload.border;
      if (action.payload.shadow) state.shadow = action.payload.shadow;
    },
  },
});

export const { setColor } = colorSlice.actions;
export default colorSlice.reducer;
