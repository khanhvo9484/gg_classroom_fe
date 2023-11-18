import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/auth.slice";
export default configureStore({
  reducer: {
    auth: authSlice,
  },
});
