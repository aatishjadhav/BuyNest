import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../slices/productsSlice";
import cartSlice from "../slices/cartSlice";
import wishSlice from "../slices/wishSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    wish: wishSlice,
  },
});
