import { createSlice } from "@reduxjs/toolkit";
import UserModel from "../models/user.model";
// Create a slice of state
type AuthState = {
  user: any;
  access_token: string;
};
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "")
      : {},
    access_token: localStorage.getItem("access_token") || "",
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      state.access_token = action.payload.access_token;
      localStorage.setItem("access_token", action.payload.access_token);
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
    },
  },
});

export const selectUser = (state: any): UserModel => state.auth.user;
export const selectAccessToken = (state: any): string =>
  state.auth.access_token;
export const { setUser, deleteUser, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;
