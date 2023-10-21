import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./../../common/helper.js";

export const getCollegesByRating = createAsyncThunk(
  "getCollegesByRating",
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}get-colleges-by-rating/${args}`);
      return res.data.collegeListByRating;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getStateWiseData = createAsyncThunk(
  "getStateWiseData",
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}get-home-state-data`);
      return res.data.stateWiseData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCourseWiseData = createAsyncThunk(
  "getCourseWiseData",
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}get-home-course-data`);
      return res.data.courseWiseData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
