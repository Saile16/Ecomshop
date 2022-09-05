import { createSlice } from "@reduxjs/toolkit";

export const orderPaySlice = createSlice({
  name: "orderPay",
  initialState: {
    loading: false,
    success: false,
  },
  reducers: {
    orderPayRequest: (state) => {
      state.loading = true;
    },
    orderPaySuccess: (state, action) => {
      state.success = true;
      state.loading = false;
    },
    orderPayFail: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    orderPayReset: (state) => {
      state.loading = false;
      state.success = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { orderPayRequest, orderPaySuccess, orderPayFail, orderPayReset } =
  orderPaySlice.actions;
