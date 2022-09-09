import { createSlice } from "@reduxjs/toolkit";

export const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    product: { reviews: [] },
    loading: false,
    errorMessage: "",
  },
  reducers: {
    loadingDetailProducts: (state) => {
      state.loading = true;
    },
    getProductDetailSuccess: (state, action) => {
      state.product = action.payload;
      state.loading = false;
    },
    getProductDetailFailure: (state, action) => {
      state.errorMessage = action.payload;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loadingDetailProducts,
  getProductDetailSuccess,
  getProductDetailFailure,
} = productDetailsSlice.actions;
