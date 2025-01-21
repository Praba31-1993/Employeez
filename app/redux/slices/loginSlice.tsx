import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/api/axiosInstance";

export interface LoginInterface {
  token: string;
  userInfo: any | null; // Ensure userInfo is either UserInfo or null
}
// Async thunk for login API call
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (params: { usernameOrEmail: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/signin", params);
      return response.data;
    } catch (error) {
      console.error("Error during API call", error);

      if (error instanceof Error) {
        // Check for Axios error format
        const axiosError = error as any;
        if (axiosError.response) {
          return rejectWithValue({ status: axiosError.response.status, message: axiosError.response.data.message });
        }
        return rejectWithValue({ status: 500, message: error.message });
      }

      // Fallback for unknown error types
      return rejectWithValue({ status: 500, message: "An unknown error occurred" });
    }
  }
);

// Create a slice
const loginSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: null as number | null, // Use number for HTTP status codes
    error: null as string | null, // Allow error to be either string or null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = null; // Reset status on logout
      state.error = null;  // Reset error on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = null; // Reset status when request starts
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 200; // Assume 200 for successful responses
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        const { status, message } = action.payload as { status: number; message: string };
        state.status = status; // Set the status code from the rejected action
        state.error = message || "Failed to login"; // Set the error message
      });
  },
});

// Export actions and reducer
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
