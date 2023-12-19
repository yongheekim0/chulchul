import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // item you added to the cart
      const item = action.payload;
      const newItem = { ...item, qty: 1 };

      // check if the item exists in the cart
      const existItem = state.cartItems.find(
        itemInCart => itemInCart._id === item._id
      );

      // update the state of the cart
      if (existItem) {
        state.cartItems = state.cartItems.map(itemInCart => {
          if (itemInCart._id === existItem._id) {
            return { ...item, qty: existItem.qty + 1 };
          } else {
            return itemInCart;
          }
        });
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }

      return updateCart(state);
    },
    decreaseQty: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(
        itemInCart => itemInCart._id === item._id
      );

      if (existItem) {
        state.cartItems = state.cartItems.map(itemInCart => {
          if (itemInCart._id === existItem._id) {
            return { ...item, qty: existItem.qty - 1 };
          } else {
            return itemInCart;
          }
        });
      }
      if (existItem.qty < 2) {
        return;
      }
      return updateCart(state);
    },
  },
});

export const { addToCart, decreaseQty } = cartSlice.actions;

export default cartSlice.reducer;
