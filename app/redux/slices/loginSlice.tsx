import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface LoginState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: { id: string; name: string } | null;
  error: string | null;
}

// Initial state
const initialState: LoginState = {
  isLoggedIn: false,
  isLoading: false,
  user: null,
  error: null,
};

// Async thunk for handling login API call
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error('Invalid login credentials');
      }
      const data = await response.json();
      return data; // Assuming the API returns user details
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ id: string; name: string }>) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

// Actions and reducer export
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
