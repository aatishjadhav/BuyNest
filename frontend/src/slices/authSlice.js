import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "https://backend-buy-nest.vercel.app";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (userData) => {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response.data.user;
  }
);

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (userData) => {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data.user;
  }
);

const getUserfromLocalStorage = () => {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getUserfromLocalStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
