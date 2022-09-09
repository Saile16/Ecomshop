import { createSlice } from "@reduxjs/toolkit";

export const userListSlice = createSlice({
  name: "userList",
  initialState: {
    users: [],
    loading: false,
    errorMessage: "",
  },
  reducers: {
    userListRequest: (state) => {
      state.loading = true;
    },
    userListSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    userListFail: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    userListReset: (state) => {
      state.users = [];
      state.loading = false;
      state.errorMessage = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { userListRequest, userListSuccess, userListFail, userListReset } =
  userListSlice.actions;
