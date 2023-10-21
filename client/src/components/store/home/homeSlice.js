import { createSlice } from "@reduxjs/toolkit";
import {
  getCollegesByRating,
  getStateWiseData,
  getCourseWiseData,
} from "./homeAction.js";

const initialState = {
  collegeListByRating: [],
  stateWiseData: [],
  courseWiseData: [],
  isLoading: false,
  success: null,
  error: null,
};

export const homeEventSlice = createSlice({
  name: "homeEvents",
  initialState,
  reducers: {},
  extraReducers: {
    [getCollegesByRating.pending]: (state) => {
      state.isLoading = true;
    },
    [getCollegesByRating.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.collegeListByRating = action.payload;
    },
    [getCollegesByRating.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    [getStateWiseData.pending]: (state) => {
      state.isLoading = true;
    },
    [getStateWiseData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.stateWiseData = action.payload;
    },
    [getStateWiseData.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    [getCourseWiseData.pending]: (state) => {
      state.isLoading = true;
    },
    [getCourseWiseData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.courseWiseData = action.payload;
    },
    [getCourseWiseData.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export default homeEventSlice.reducer;
