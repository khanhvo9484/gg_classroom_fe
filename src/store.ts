import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/auth.slice";
import coursesSlice from "./redux/courses.slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    courses: coursesSlice,
  },
});

export default store;
