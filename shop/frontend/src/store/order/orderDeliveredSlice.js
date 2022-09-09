import { createSlice } from "@reduxjs/toolkit";

export const orderDeliveredSlice = createSlice({
  name: "orderDelivered",
  initialState: {
    loading: false,
    success: false,
    errorMessage: "",
  },
  reducers: {
    orderDeliveredRequest: (state) => {
      state.loading = true;
    },
    orderDeliveredSuccess: (state, action) => {
      state.success = true;
      state.loading = false;
    },
    orderDeliveredFail: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    orderDeliveredReset: (state) => {
      state.loading = false;
      state.success = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  orderDeliveredRequest,
  orderDeliveredSuccess,
  orderDeliveredFail,
  orderDeliveredReset,
} = orderDeliveredSlice.actions;
