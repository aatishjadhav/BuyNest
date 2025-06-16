import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCoupon: null,
  discountAmount: 0,
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    applyCoupon: (state, action) => {
      state.selectedCoupon = action.payload;
      state.discountAmount = action.payload.discount;
    },
    clearCoupon: (state) => {
      state.selectedCoupon = null;
      state.discountAmount = 0;
    },
  },
});

export const { applyCoupon, clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;
