import { createSlice } from "@reduxjs/toolkit";

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    order: {},
    shippingAddress: {},
    loading: false,
    errorMessage: "",
  },
  reducers: {
    orderDetailsRequest: (state) => {
      state.loading = true;
    },
    orderDetailsSuccess: (state, action) => {
      state.order = action.payload;
      state.loading = false;
    },
    orderDetailsFail: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { orderDetailsRequest, orderDetailsSuccess, orderDetailsFail } =
  orderDetailsSlice.actions;
