import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dashboardLayoutData } from "@/app/reusableComponent/JsonData";

const initialState = dashboardLayoutData;

const dashboardLayoutSlice = createSlice({
  name: "dashboardLayoutData",
  initialState,
  reducers: {
    toggleCheckbox: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const item = state.find((list) => list.id === id);
      if (item) {
        item.checked = !item.checked;
      }
    },
  },
});

export const { toggleCheckbox } = dashboardLayoutSlice.actions;
export default dashboardLayoutSlice.reducer;
