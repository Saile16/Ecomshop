import { createSlice } from "@reduxjs/toolkit";

export const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: {
    loading: false,
    userInfo: null,
    errorMessage: "",
  },
  reducers: {
    userRegisterRequest: (state) => {
      state.loading = true;
    },
    userRegisterSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    userRegisterFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userRegisterRequest, userRegisterSuccess, userRegisterFailure } =
  userRegisterSlice.actions;
