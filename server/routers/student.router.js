import express from "express";

import {
  addStudent,
  getStudentByCollege,
  getStudentData,
} from "../controllers/student.controller.js";

const studentRouter = express.Router();

studentRouter.post("/add-student", addStudent);

studentRouter.get(
  "/get-student-by-college/:collegeId/:limit/:pageNo",
  getStudentByCollege
);

studentRouter.get("/get-student-data/:studentId", getStudentData);

export default studentRouter;
