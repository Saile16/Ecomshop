import { createSlice } from "@reduxjs/toolkit";

export const userUpdateProfileSlice = createSlice({
  name: "userUpdateProfile",
  initialState: {
    userInfo: {},
    loading: false,
    success: false,
    errorMessage: "",
  },
  reducers: {
    userUpdateProfileRequest: (state) => {
      state.loading = true;
    },
    userUpdaterProfileSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload;
    },
    userUpdaterProfileFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.errorMessage = action.payload;
    },
    userUpdateProfileReset: (state) => {
      state.userInfo = {};
      state.loading = false;
      state.success = null;
      state.errorMessage = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  userUpdateProfileRequest,
  userUpdaterProfileSuccess,
  userUpdaterProfileFailure,
  userUpdateProfileReset,
} = userUpdateProfileSlice.actions;

// Action creators are generated for each case reducer function
