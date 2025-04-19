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

// const loadOrdersFromLocalStorage = () => {
//   const orders = localStorage.getItem("orders");
//   return orders ? JSON.parse(orders) : [];
// };

// const saveOrdersToLocalStorage = (orders) => {
//   localStorage.setItem("orders", JSON.stringify(orders));
// };

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
    //   saveOrdersToLocalStorage(action.payload); // Persist orders to local storage
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
    //   saveOrdersToLocalStorage(state.orders); // Persist updated orders to local storage
    });
    builder.addCase(addNewOrder.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default orderSlice.reducer;
