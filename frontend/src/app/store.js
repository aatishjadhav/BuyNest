import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../slices/productsSlice";
import cartSlice from "../slices/cartSlice";
import wishSlice from "../slices/wishSlice";
import authSlice from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    auth: authSlice,
    wish: wishSlice,
    
  },
});
