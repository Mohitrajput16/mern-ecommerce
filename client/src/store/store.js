// client/src/store/store.js
import { configureStore } from '@reduxjs/toolkit';

// We will create this file in the next step
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // We'll add cartSlice here later
  },
  devTools: true, // Enables Redux DevTools in your browser
});

export default store;