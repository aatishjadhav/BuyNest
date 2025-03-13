import { createSlice } from "@reduxjs/toolkit";

export const wishSlice = createSlice({
  name: "wish",
  initialState: {
    wish: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.wish.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.wish = state.wish.filter((item) => item._id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishSlice.actions;

export default wishSlice.reducer;
