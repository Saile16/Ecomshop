import { createSlice } from "@reduxjs/toolkit";

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    state: "not-authenticated",
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    errorMessage: "",
  },
  reducers: {
    userLoginRequest: (state) => {
      state.state = "checking-authentication";
    },
    userLoginSuccess: (state, action) => {
      state.state = "authenticated";
      state.userInfo = action.payload;
    },
    userLoginFailure: (state, action) => {
      state.state = "not-authenticated";
      state.errorMessage = action.payload;
    },
    userLogout: (state) => {
      state.state = "not-authenticated";
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
