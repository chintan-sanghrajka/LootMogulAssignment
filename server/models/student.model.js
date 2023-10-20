import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StudentModel = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  batch: {
    type: Number,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
  },
});

export default mongoose.model("students", StudentModel);
