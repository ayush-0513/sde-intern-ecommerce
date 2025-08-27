import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // { id, title, price, image, quantity }
  },
  reducers: {
    // Adds an item to the cart or increases its quantity
    addItem: (state, action) => {
      const { id, title, price, image, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ id, title, price, image, quantity });
      }
    },
    // Removes an item completely from the cart
    removeItem: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    // Updates the quantity of a specific item
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
    // Clears all items from the cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

// Selector to get the total number of items in the cart
export const selectTotalCartItems = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

// Selector to get the grand total price of the cart
export const selectGrandTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;