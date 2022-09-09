import { createSlice } from "@reduxjs/toolkit";

export const productCreateReviewSlice = createSlice({
  name: "productCreateReview",
  initialState: {
    loading: false,
    success: false,
    errorMessage: "",
  },
  reducers: {
    productCreateReviewRequest: (state) => {
      state.loading = true;
    },
    productCreateReviewSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    productCreateReviewFail: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    productCreateReviewReset: (state) => {
      state.loading = false;
      state.success = false;
      state.errorMessage = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  productCreateReviewRequest,
  productCreateReviewSuccess,
  productCreateReviewFail,
  productCreateReviewReset,
} = productCreateReviewSlice.actions;
