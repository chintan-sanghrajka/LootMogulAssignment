import { createSlice } from "@reduxjs/toolkit";
import {
  getCollegeData,
  getSearchColleges,
  getColleges,
  clearColleges,
} from "./collegeAction.js";

const initialState = {
  collegeData: [],
  searchColleges: [],
  collegeList: [],
  collegeCount: 0,
  isLoading: false,
  success: null,
  error: null,
};

export const collegeEventSlice = createSlice({
  name: "collegeEvents",
  initialState,
  reducers: {},
  extraReducers: {
    [getCollegeData.pending]: (state) => {
      state.isLoading = true;
    },
    [getCollegeData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.collegeData = action.payload;
    },
    [getCollegeData.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    [getSearchColleges.pending]: (state) => {
      state.isLoading = true;
    },
    [getSearchColleges.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.searchColleges = action.payload;
    },
    [getSearchColleges.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    [getColleges.pending]: (state) => {
      state.isLoading = true;
    },
    [getColleges.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.collegeList = [...state.collegeList, ...action.payload.collegeList];
      state.collegeCount = action.payload.collegeCount;
    },
    [getColleges.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    [clearColleges.pending]: (state) => {
      state.isLoading = true;
    },
    [clearColleges.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.collegeList = action.payload;
    },
    [clearColleges.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export default collegeEventSlice.reducer;
