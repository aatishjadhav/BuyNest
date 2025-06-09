import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

export const fetchProducts = createAsyncThunk(
  "/products/fetchProducts",
  async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    console.log("response from redux toolkit", response);
    return response.data;
  }
);

export const fetchByCategory = createAsyncThunk(
  "/products/fetchByCategory",
  async (category) => {
    const response = await axios.get(
      `${BASE_URL}/products/categories/${category}`
    );
    console.log("response from redux toolkit", response);

    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: [],
    status: "idle",
    error: null,
    searchQuery: "",
    filters: {
      rating: null,
      sortBy: null,
      category: [],
      maxPrice: 8000,
    },
  },
  reducers: {
    filterBySearch: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredProducts = state.products.filter((prod) =>
        prod.name.toLowerCase().includes(state.searchQuery)
      );
    },
    filterProducts: (state) => {
      let filtered = state.products;

      if (state.filters.rating) {
        filtered = filtered.filter(
          (product) => product.rating >= state.filters.rating
        );
      }
      if (state.filters.category.length > 0) {
        filtered = filtered.filter((product) =>
          state.filters.category.includes(product.category)
        );
      }

      if (state.filters.maxPrice) {
        filtered = filtered.filter(
          (prod) => prod.price <= state.filters.maxPrice
        );
      }

      if (state.filters.sortBy === "lowToHigh") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (state.filters.sortBy === "highToLow") {
        filtered.sort((a, b) => b.price - a.price);
      }

      state.filteredProducts = filtered;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        rating: null,
        sortBy: null,
        category: [],
        maxPrice: 8000,
      };
      state.searchQuery = "";
      state.filteredProducts = state.products;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.products = action.payload;
      state.filteredProducts = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchByCategory.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchByCategory.fulfilled, (state, action) => {
      state.status = "success";
      state.products = action.payload;
      state.filteredProducts = action.payload;
    });
    builder.addCase(fetchByCategory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { filterBySearch, filterProducts, setFilters, clearFilters } =
  productsSlice.actions;

export default productsSlice.reducer;
