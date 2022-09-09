import { createSlice } from "@reduxjs/toolkit";

export const userUpdateAdminSlice = createSlice({
  name: "userUpdateAdmin",
  initialState: {
    user: {},
    loading: false,
    success: false,
    errorMessage: "",
  },
  reducers: {
    userUpdateAdminRequest: (state, action) => {
      state.loading = true;
    },
    userUpdateAdminSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    },
    userUpdateAdminFail: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    userUpdateAdminReset: (state, action) => {
      state.loading = false;
      state.success = false;
      state.errorMessage = "";
      state.user = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  userUpdateAdminRequest,
  userUpdateAdminSuccess,
  userUpdateAdminFail,
  userUpdateAdminReset,
} = userUpdateAdminSlice.actions;
