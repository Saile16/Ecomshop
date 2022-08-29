import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    errorMessage: "",
  },
  reducers: {
    loadingProducts: (state) => {
      state.loading = true;
    },
    getProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    getProductsFailure: (state, action) => {
      state.errorMessage = action.payload;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { increment } = productSlice.actions;
export const { getProductsSuccess, getProductsFailure, loadingProducts } =
  productsSlice.actions;
