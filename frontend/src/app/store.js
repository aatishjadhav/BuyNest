import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../slices/productsSlice";
import cartSlice from "../slices/cartSlice";
import wishSlice from "../slices/wishSlice";
import authSlice from "../slices/authSlice";
import orderSlice from "../slices/orderSlice";
import couponSlice from "../slices/couponSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    auth: authSlice,
    wish: wishSlice,
    orders: orderSlice,
    coupon: couponSlice
  },
});
