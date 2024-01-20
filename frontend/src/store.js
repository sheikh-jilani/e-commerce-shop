import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./slices/apiSlice";
import cartSlice from "./slices/cartslice";
import userCredentialSlice from "./slices/userCredentialSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice.reducer,
    userCredentials: userCredentialSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
