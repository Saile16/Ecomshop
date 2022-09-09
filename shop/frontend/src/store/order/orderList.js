import { createSlice } from "@reduxjs/toolkit";

export const orderListSlice = createSlice({
  name: "orderList",
  initialState: {
    orders: [],
    loading: false,
    errorMessage: "",
  },
  reducers: {
    orderListRequest: (state) => {
      state.loading = true;
    },
    orderListSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    orderListFail: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    orderListReset: (state) => {
      state.orders = [];
      state.loading = false;
      state.errorMessage = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  orderListRequest,
  orderListSuccess,
  orderListFail,
  orderListReset,
} = orderListSlice.actions;
