import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: []}

const addDecimals = (num) => {
  return (Math.round(num * 100)).toFixed(2);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // item you added to the cart
      const item = action.payload;

      // check if the item exists in the cart
      const existItem = state.cartItems.find((itemInCart) => itemInCart._id === item._id )

      // update the state of the cart
      if(existItem) {
        state.cartItems = state.cartItems.map(itemInCart => itemInCart._id === existItem._id ? item : itemInCart)
      } else {
        state.cartItems = [...state.cartItems, item]
      }

      return updateCart(state)
    }
  }

})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer