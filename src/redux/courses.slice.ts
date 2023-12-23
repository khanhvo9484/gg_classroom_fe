import { createSlice } from "@reduxjs/toolkit";
import { ICourse } from "@/models/class.model";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses : localStorage.getItem("courses")
    ? JSON.parse(localStorage.getItem("courses") || "")
    : [],
  },
  reducers: {
    setCourses(state, action) {
      state.courses = action.payload.courses;
      localStorage.setItem("courses", JSON.stringify(action.payload.courses));
    },
    deleteCourses(state) {
      state.courses = [];
      localStorage.removeItem("courses");
    },
  },
});

export const selectCourses = (state: any) : ICourse[]=> state.courses.courses;
export const { setCourses, deleteCourses, updateCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
