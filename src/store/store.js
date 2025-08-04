import { configureStore } from '@reduxjs/toolkit';  // Import configureStore helper from Redux Toolkit
import appReducer from './appSlice';                // Import the slice reducer for the form state

// Create and export the Redux store instance
export const store = configureStore({
  // Configure the root reducer by assigning the `form` slice reducer
  // The reducer key 'form' corresponds to the state slice managed by appReducer
  reducer: {
    form: appReducer
  },
  
  // You can add middleware, devTools configs here if needed, for example:
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // devTools: process.env.NODE_ENV !== 'production',
});
