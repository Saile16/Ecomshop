import { createSlice } from "@reduxjs/toolkit";

export const orderListAdminSlice = createSlice({
  name: "orderListAdmin",
  initialState: {
    loading: false,
    orders: [],
    errorMessage: "",
  },
  reducers: {
    orderListAdminRequest: (state) => {
      state.loading = true;
    },
    orderListAdminSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    orderListAdminFail: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  orderListAdminRequest,
  orderListAdminSuccess,
  orderListAdminFail,
} = orderListAdminSlice.actions;
