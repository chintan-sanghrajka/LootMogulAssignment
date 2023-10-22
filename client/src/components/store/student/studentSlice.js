import { createSlice } from "@reduxjs/toolkit";
import {
  getStudentList,
  getStudentData,
  getStudentListByCollege,
  clearStudents,
} from "./studentAction.js";

const initialState = {
  studentList: [],
  studentData: [],
  studentCount: 0,
  studentListByCollege: [],
  isLoading: false,
  success: null,
  error: null,
};

export const studentEventSlice = createSlice({
  name: "studentEvents",
  initialState,
  reducers: {},
  extraReducers: {
    [getStudentList.pending]: (state) => {
      state.isLoading = true;
    },
    [getStudentList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.studentList = action.payload;
    },
    [getStudentList.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    [getStudentData.pending]: (state) => {
      state.isLoading = true;
    },
    [getStudentData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.studentData = action.payload;
    },
    [getStudentData.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    [getStudentListByCollege.pending]: (state) => {
      state.isLoading = true;
    },
    [getStudentListByCollege.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.studentListByCollege = [
        ...state.studentListByCollege,
        ...action.payload.studentList,
      ];
      state.studentCount = action.payload.studentCount;
    },
    [getStudentListByCollege.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    [clearStudents.pending]: (state) => {
      state.isLoading = true;
    },
    [clearStudents.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.studentListByCollege = action.payload;
    },
    [clearStudents.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export default studentEventSlice.reducer;
