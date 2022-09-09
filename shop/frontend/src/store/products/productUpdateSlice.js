import { createSlice } from "@reduxjs/toolkit";

export const productUpdateSlice = createSlice({
  name: "productUpdate",
  initialState: {
    product: {},
    loading: false,
    success: false,
    errorMessage: "",
  },
  reducers: {
    productUpdateRequest: (state) => {
      state.loading = true;
    },
    productUpdateSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.product = action.payload;
    },
    productUpdateFail: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    productUpdateReset: (state, action) => {
      state.product = {};
      state.loading = false;
      state.success = false;
      state.errorMessage = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  productUpdateRequest,
  productUpdateSuccess,
  productUpdateFail,
  productUpdateReset,
} = productUpdateSlice.actions;
