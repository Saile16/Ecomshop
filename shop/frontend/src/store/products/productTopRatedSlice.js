import { createSlice } from "@reduxjs/toolkit";

export const productTopRatedSlice = createSlice({
  name: "productTop",
  initialState: {
    products: [],
    loading: false,
    errorMessage: "",
  },
  reducers: {
    productTopRatedRequest: (state) => {
      state.loading = true;
    },
    productTopRatedRequestSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    productTopRatedRequestFail: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  productTopRatedRequest,
  productTopRatedRequestSuccess,
  productTopRatedRequestFail,
} = productTopRatedSlice.actions;
