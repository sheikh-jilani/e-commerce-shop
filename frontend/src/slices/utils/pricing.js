import { addDouble } from "./doubleFun";

export const pricing = (state) => {
  state.price = addDouble(
    state.cartItems.reduce((a, b) => a + b.price * b.qnty, 0)
  );
  state.shippingPrice = addDouble(state.price >= 100 ? 15 : 0);
  state.taxPrice = addDouble(0.15 * state.price);
  state.totalPrice = addDouble(
    Number(state.price) + Number(state.shippingPrice) + Number(state.taxPrice)
  );
  return state;
};
