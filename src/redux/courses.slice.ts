import { createSlice } from "@reduxjs/toolkit";
import { ICourse } from "@/models/class.model";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
  },
  reducers: {
    setCourses(state, action) {
      state.courses = action.payload.courses;
    },
    deleteCourses(state) {
      state.courses = [];
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectCourses = (state: any): ICourse[] => state.courses.courses;
export const { setCourses, deleteCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
