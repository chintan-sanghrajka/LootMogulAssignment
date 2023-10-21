import { createSlice } from "@reduxjs/toolkit";
import {
  getCollegeData,
  getSearchColleges,
  getColleges,
} from "./collegeAction.js";

const initialState = {
  collegeData: [],
  searchColleges: [],
  collegeList: [],
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
      state.collegeList = [...state.collegeList, ...action.payload];
    },
    [getColleges.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export default collegeEventSlice.reducer;
