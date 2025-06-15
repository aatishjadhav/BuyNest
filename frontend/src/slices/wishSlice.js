import { createSlice } from "@reduxjs/toolkit";

const loadWishlistFromLocalStorage = () => {
  const wishlist = localStorage.getItem("wishlist");
  return wishlist ? JSON.parse(wishlist) : [];
};

export const wishSlice = createSlice({
  name: "wish",
  initialState: {
    wish: loadWishlistFromLocalStorage(),
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.wish.push(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.wish));
    },
    removeFromWishlist: (state, action) => {
      state.wish = state.wish.filter((item) => item?._id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.wish));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishSlice.actions;

export default wishSlice.reducer;
