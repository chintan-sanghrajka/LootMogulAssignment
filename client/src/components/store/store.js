import { configureStore } from "@reduxjs/toolkit";
import homeEventReducer from "./home/homeSlice.js";
import collegeEventSlice from "./college/collegeSlice.js";
import studentEventSlice from "./student/studentSlice.js";

const store = configureStore({
  reducer: {
    home: homeEventReducer,
    college: collegeEventSlice,
    student: studentEventSlice,
  },
});

export default store;
