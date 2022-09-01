import { createSlice } from "@reduxjs/toolkit";

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    loading: false,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    errorMessage: "",
  },
  reducers: {
    userLoginRequest: (state) => {
      state.loading = true;
    },
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    userLoginFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    userLogout: (state) => {
      //   state.loading = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
  userLogout,
} = userAuthSlice.actions;
