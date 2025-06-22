import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

export const fetchAddress = createAsyncThunk("address/getAddress", async () => {
  const response = await axios.get(`${BASE_URL}/address`);
  return response.data;
});

export const addNewAddress = createAsyncThunk(
  "address/addNewAddress",
  async (address) => {
    const response = await axios.post(`${BASE_URL}/address`, address);
    return response.data;
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ addressId, dataToUpdate }) => {
    const response = await axios.put(
      `${BASE_URL}/address/${addressId}`,
      dataToUpdate
    );
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressId) => {
    await axios.delete(`${BASE_URL}/address/${addressId}`);
    return addressId;
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddress.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.addresses = action.payload;
    });
    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(addNewAddress.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.addresses.push(action.payload);
    });
    builder.addCase(addNewAddress.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(updateAddress.fulfilled, (state, action) => {
      state.status = "success";
      const index = state.addresses.findIndex(
        (a) => a._id === action.payload._id
      );
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    });

    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.addresses = state.addresses.filter((a) => a._id !== action.payload);
    });
  },
});

export default addressSlice.reducer;
