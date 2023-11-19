import { createSlice } from "@reduxjs/toolkit";

// Create a slice of state

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

    deleteUser(state) {
      state.user = {};
      localStorage.removeItem("user");

      state.access_token = "";
      localStorage.removeItem("access_token");
    },
  },
});

export const selectUser = (state: any) => state.auth.user;
export const selectAccessToken = (state: any) => state.auth.access_token;
export const { setUser, deleteUser } = authSlice.actions;
export default authSlice.reducer;
