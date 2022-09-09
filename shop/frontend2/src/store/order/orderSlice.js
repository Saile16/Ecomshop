import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    loading: false,
    success: false,
    errorMessage: "",
  },
  reducers: {
    orderCreateRequest: (state) => {
      state.loading = true;
    },
    orderCreateSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    orderCreateFail: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    orderCreateReset: (state) => {
      state.loading = false;
      state.success = false;
      state.order = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFail,
  orderCreateReset,
} = orderSlice.actions;
