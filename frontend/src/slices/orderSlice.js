import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.orders;
});

export const addNewOrder = createAsyncThunk(
  "orders/addNewOrder",
  async (orderData) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/orders`, orderData, {
        headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.status = "success";
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(addNewOrder.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.orders.push(action.payload);
    });
    builder.addCase(addNewOrder.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default orderSlice.reducer;
