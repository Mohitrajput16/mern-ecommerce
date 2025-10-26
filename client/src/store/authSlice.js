// client/src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Check if user info is already in localStorage (from a previous session)
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // This action is called when a user logs in
    setCredentials(state, action) {
      state.userInfo = action.payload;
      // Save user info to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    // This action is called when a user logs out
    logout(state) {
      state.userInfo = null;
      // Remove user info from localStorage
      localStorage.removeItem('userInfo');
    },
  },
});

// Export the actions
export const { setCredentials, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;