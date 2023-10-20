import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CollegeModel = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  yearFounded: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  noOfStudents: {
    type: Number,
    required: true,
  },
  courses: {
    type: [String],
    required: true,
  },
});

export default mongoose.model("colleges", CollegeModel);
