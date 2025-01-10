import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store"; // Import AppDispatch for correct typing
import { User } from "@/app/reusableComponent/interfacetypes";
const initialState = {
  role: "SA",
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
  (userProfile: User) => (dispatch: AppDispatch) => {
    if (userProfile !== undefined) {
      const firstUserRole = userProfile?.role;
      if (firstUserRole) {
        dispatch(setRole(firstUserRole));
      }
    }
  };

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
