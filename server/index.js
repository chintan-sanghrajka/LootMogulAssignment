import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import collegeRouter from "./routers/college.router.js";
import studentRouter from "./routers/student.router.js";
import StudentModel from "./models/student.model.js";

dotenv.config();

// Enviornment variables
const PORT = process.env.PORT;
const DBLink = process.env.DBLink;

const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});

// Database connection
mongoose
  .connect(DBLink)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

// Routers
app.use(collegeRouter);
app.use(studentRouter);
