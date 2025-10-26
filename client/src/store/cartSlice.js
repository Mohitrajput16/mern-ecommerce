// client/src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper function to add/update localStorage
const updateLocalStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

// Load cart items from localStorage if they exist
const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action to add an item (or update quantity if it already exists)
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === newItem._id);

      if (existingItem) {
        // If item exists, just update its quantity
        existingItem.qty = newItem.qty;
      } else {
        // If new item, add it to the array
        state.cartItems.push(newItem);
      }
      updateLocalStorage(state.cartItems);
    },

    // Action to remove an item from the cart
    removeFromCart(state, action) {
      const idToRemove = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== idToRemove);
      updateLocalStorage(state.cartItems);
    },
  },
});

// Export the actions
export const { addToCart, removeFromCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;