import express from "express";

import {
  addCollege,
  getCollegesByRating,
  findColleges,
  getCollegeData,
  getSimilarColleges,
  getHomeStateWiseData,
  getColleges,
  getHomeCourseWiseData,
} from "../controllers/college.controller.js";

const collegeRouter = express.Router();

collegeRouter.post("/add-college", addCollege);

collegeRouter.get("/get-colleges-by-rating/:limit", getCollegesByRating);

collegeRouter.get("/find-colleges/:userInput", findColleges);

collegeRouter.get("/college-data/:id", getCollegeData);

collegeRouter.post("/get-similar-colleges", getSimilarColleges);

collegeRouter.get("/get-home-state-data", getHomeStateWiseData);

collegeRouter.get("/get-home-course-data", getHomeCourseWiseData);

collegeRouter.get("/get-colleges/:action/:value/:limit/:pageNo", getColleges);

export default collegeRouter;
