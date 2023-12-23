import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/auth.slice";
import coursesSlice from "./redux/courses.slice";
export default configureStore({
  reducer: {
    auth: authSlice,
    courses: coursesSlice,
  },
});
