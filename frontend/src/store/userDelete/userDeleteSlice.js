import { createSlice } from "@reduxjs/toolkit";

export const userDeleteSlice = createSlice({
  name: "userDelete",
  initialState: {
    loading: false,
    success: false,
    errorMessage: "",
  },
  reducers: {
    userDeleteRequest: (state) => {
      state.loading = true;
    },
    userDeleteSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    userDeleteFail: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userDeleteRequest, userDeleteSuccess, userDeleteFail } =
  userDeleteSlice.actions;
