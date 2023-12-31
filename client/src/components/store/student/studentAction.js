import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../common/helper.js";

export const getStudentList = createAsyncThunk(
  "getStudentList",
  async ({ collegeId, limit, pageNo }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}get-student-by-college/${collegeId}/${limit}/${pageNo}`
      );
      return res.data.studentList;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getStudentData = createAsyncThunk(
  "getStudentData",
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}get-student-data/${args}`);
      return res.data.studentData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getStudentListByCollege = createAsyncThunk(
  "getStudentListByCollege",
  async ({ collegeId, limit, pageNo }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}get-student-by-college/${collegeId}/${limit}/${pageNo}`
      );
      let studentList = res.data.studentList;
      let studentCount = res.data.studentCount;
      return { studentList, studentCount };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

let emptyArray = [];

export const clearStudents = createAsyncThunk(
  "clearStudents",
  async (args, { rejectWithValue }) => {
    try {
      return emptyArray;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
