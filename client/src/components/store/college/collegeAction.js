import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../common/helper.js";

export const getCollegeData = createAsyncThunk(
  "getCollegeData",
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}college-data/${args}`);
      return res.data.collegeData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSearchColleges = createAsyncThunk(
  "getSearchColleges",
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}find-colleges/${args}`);
      return res.data.searchCollegesList;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getColleges = createAsyncThunk(
  "getColleges",
  async ({ action, value, limit, pageNo }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}get-colleges/${action}/${value}/${limit}/${pageNo}`
      );
      let collegeList = res.data.collegeList;
      let collegeCount = res.data.collegeCount;
      return { collegeList, collegeCount };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

let emptyArray = [];

export const clearColleges = createAsyncThunk(
  "clearColleges",
  async (args, { rejectWithValue }) => {
    try {
      return emptyArray;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
