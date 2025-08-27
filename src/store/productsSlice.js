import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

// Async thunk to fetch all products
// Caching logic: Only fetches if the products array is empty.
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { getState }) => {
    const state = getState();
    if (state.products.items.length > 0) {
      return state.products.items; // Return cached data
    }
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  }
);

// Async thunk to fetch all categories
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { getState }) => {
    const state = getState();
    if (state.products.categories.length > 0) {
      return state.products.categories; // Return cached data
    }
    const response = await axios.get(`${API_URL}/products/categories`);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    categories: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts lifecycle
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle fetchCategories lifecycle
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export default productsSlice.reducer;