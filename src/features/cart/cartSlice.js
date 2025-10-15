import { createSlice } from '@reduxjs/toolkit';

// Get cart from localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems'));

const initialState = {
  cartItems: cartItems ? cartItems : [],
  cartTotal: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x._id === item._id && x.size === item.size && x.color === item.color
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id && x.size === existItem.size && x.color === existItem.color
            ? item
            : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

      // Calculate total
      state.cartTotal = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      const { _id, size, color } = action.payload;
      state.cartItems = state.cartItems.filter(
        (x) => !(x._id === _id && x.size === size && x.color === color)
      );

      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

      // Calculate total
      state.cartTotal = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { _id, size, color, quantity } = action.payload;
      const item = state.cartItems.find(
        (x) => x._id === _id && x.size === size && x.color === color
      );

      if (item) {
        item.quantity = quantity;
      }

      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

      // Calculate total
      state.cartTotal = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotal = 0;
      localStorage.removeItem('cartItems');
    },
    calculateTotal: (state) => {
      state.cartTotal = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, calculateTotal } =
  cartSlice.actions;
export default cartSlice.reducer;

