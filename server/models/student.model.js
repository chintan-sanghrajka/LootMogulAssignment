import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StudentModel = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  collegeId: {
    type: String,
    required: true,
  },
  batch: {
    type: Number,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
});

export default mongoose.model("students", StudentModel);
