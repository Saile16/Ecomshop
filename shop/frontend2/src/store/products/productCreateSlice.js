import { createSlice } from "@reduxjs/toolkit";

export const productCreateSlice = createSlice({
  name: "productCreate",
  initialState: {
    loading: false,
    success: false,
    errorMessage: "",
    product: {},
  },
  reducers: {
    productCreateRequest: (state) => {
      state.loading = true;
    },
    productCreateSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.product = action.payload;
    },
    productCreateFail: (state) => {
      state.loading = false;
      state.success = false;
      state.errorMessage = action.payload;
    },
    productCreateReset: (state) => {
      state.loading = false;
      state.success = false;
      state.errorMessage = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  productCreateReset,
} = productCreateSlice.actions;
