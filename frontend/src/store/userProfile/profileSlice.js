import { createSlice } from "@reduxjs/toolkit";

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    user: {},
    loading: false,
    errorMessage: "",
  },
  reducers: {
    userProfileRequest: (state) => {
      state.loading = true;
    },
    userProfileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    userProfileFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function

export const { userProfileRequest, userProfileSuccess, userProfileFailure } =
  userProfileSlice.actions;
