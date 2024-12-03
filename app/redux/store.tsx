import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import dataSlice from "./slices/testdataSlice";
import colorReducer from "./slices/colorSlice";
import modeReducer from "./slices/modeSlice"; // Import the modeSlice reducer

// Create a store and add all reducers
export const store = configureStore({
  reducer: {
    login: loginSlice,
    testdata: dataSlice,
    color: colorReducer,
    mode: modeReducer, // Add the mode reducer here
  },
});

// Export store types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
