// client/src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
// import updateCartInStorage from '@babel/core'

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
      const newItem = action.payload;

      // Check if the item already exists in the cart
      const existingItem = state.cartItems.find((item) => item._id === newItem._id);

      if (existingItem) {
        // If it exists, create a NEW array by mapping over the old one
        state.cartItems = state.cartItems.map((item) =>
          item._id === existingItem._id ? newItem : item
        );
      } else {
        // If it's a new item, add it to the array
        state.cartItems = [...state.cartItems, newItem];
      }

      // CRITICAL: Make sure you are saving the updated state to localStorage
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
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      updateCartInStorage(state);
    },
    clearCartItems(state) {
      state.cartItems = [];
      updateCartInStorage(state); // updateCartInStorage is your helper function
    },
  },
});

// Export the new action
export const { addToCart, removeFromCart, saveShippingAddress,savePaymentMethod,clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;