import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store"; // Import AppDispatch for correct typing

const initialState = {
  role: "SA", // Initialize the role state
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
  },
});

// Thunk to initialize the role
export const initializeRole =
  (userProfile: { userInfo: { role: string } }[]) =>
  (dispatch: AppDispatch) => {
    if (userProfile.length > 0) {
      const firstUserRole = userProfile[0]?.userInfo?.role; // Extract the first user's role
      if (firstUserRole) {
        dispatch(setRole(firstUserRole));
      }
    }
  };

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
