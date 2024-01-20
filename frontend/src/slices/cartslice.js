import { createSlice } from "@reduxjs/toolkit";
import { pricing } from "./utils/pricing";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "paypal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // adding an item to cart.................
    addToCart(state, action) {
      const item = action.payload;

      // cheching if the item exsists or not..............
      const exsistingItem = state.cartItems.find((itm) => itm._id === item._id);
      if (exsistingItem) {
        // if exsists then replace it the the updated item.....
        state.cartItems = state.cartItems.map((itm) =>
          itm._id === exsistingItem._id ? item : itm
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      pricing(state);

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // remove a product form cart...........................
    removeFromCart(state, action) {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== id && x);
      pricing(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Shipping address action creator................
    shippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // saving the payment method "paypal"......................
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems(state, action) {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  shippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;
export default cartSlice;
