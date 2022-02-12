import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(window.localStorage.getItem("auth")) ?? {
  loggedIn: false,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.loggedIn = true;
      state.user = payload;
      window.localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
      window.localStorage.clear("auth");
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
