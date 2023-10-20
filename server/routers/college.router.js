import express from "express";

import {
  addCollege,
  getCollegesByRating,
  findColleges,
  getCollegeData,
  getSimilarColleges,
} from "../controllers/college.controller.js";

const collegeRouter = express.Router();

collegeRouter.post("/add-college", addCollege);

collegeRouter.get("/get-colleges-by-rating/:limit", getCollegesByRating);

collegeRouter.get("/find-colleges/:userInput", findColleges);

collegeRouter.get("/college-data/:id", getCollegeData);

collegeRouter.post("/get-similar-colleges", getSimilarColleges);

export default collegeRouter;
