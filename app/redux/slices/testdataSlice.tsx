import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface DataState {
  data: { carts: any[] } | null;  // Adjust type based on your API response
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: DataState = {
  data: null,
  isLoading: false,
  error: null,
};

// Async thunk for fetching data from the API
export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://dummyjson.com/carts'); // Replace with your API URL
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data; // Return the fetched data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    clearData(state) {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Actions and reducer export
export const { clearData } = dataSlice.actions;
export default dataSlice.reducer;
