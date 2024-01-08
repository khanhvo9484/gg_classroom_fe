/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import UserModel from "../models/user.model";
import socket from "@socket/socket";
// Create a slice of state
// type AuthState = {
//   user: any;
//   access_token: string;
// };
const connectSocket = (user) => {
  if (user && user.id) {
    if (!socket.connected) {
      socket.io.opts.query = {
        userId: user.id,
      };
      socket.connect();
    }
  }
};
const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "")
    : {},
  access_token: localStorage.getItem("access_token") || "",
  refresh_token: localStorage.getItem("access_token") || "",
};
if (initialState.user && initialState.user.id) {
  connectSocket(initialState.user);
}
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      state.access_token = action.payload.access_token;
      localStorage.setItem("access_token", action.payload.access_token);

      state.refresh_token = action.payload.refresh_token;
      localStorage.setItem("refresh_token", action.payload.refresh_token);

      connectSocket(action.payload.user);
    },
    updateUserProfile(state, action) {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    deleteUser(state) {
      state.user = {};
      localStorage.removeItem("user");

      state.access_token = "";
      localStorage.removeItem("access_token");

      state.refresh_token = "";
      localStorage.removeItem("refresh_token");
    },
  },
});

export const selectUser = (state: any): UserModel => state.auth.user;
export const selectAccessToken = (state: any): string =>
  state.auth.access_token;
export const selectRefreshToken = (state: any): string =>
  state.auth.refresh_token;

export const { setUser, deleteUser, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;
