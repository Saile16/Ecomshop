import { createSlice } from "@reduxjs/toolkit";

export const productDeleteSlice = createSlice({
  name: "productDelete",
  initialState: {
    loading: false,
    success: false,
    errorMessage: "",
  },
  reducers: {
    productDeleteRequest: (state) => {
      state.loading = true;
    },
    productDeleteSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    productDeleteFail: (state) => {
      state.loading = false;
      state.success = false;
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { productDeleteRequest, productDeleteSuccess, productDeleteFail } =
  productDeleteSlice.actions;
