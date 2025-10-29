// client/src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper function to add/update localStorage for cart items
const updateCartInStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// --- MODIFIED INITIAL STATE ---
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      // ... (your existing addToCart logic is fine)
      state.cartItems = [...state.cartItems]; // Ensure state update
      updateCartInStorage(state);
    },

    removeFromCart(state, action) {
      // ... (your existing removeFromCart logic is fine)
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
      updateCartInStorage(state);
    },

    // --- NEW ACTION ---
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      updateCartInStorage(state);
    },
  },
});

// Export the new action
export const { addToCart, removeFromCart, saveShippingAddress } = cartSlice.actions;

export default cartSlice.reducer;