import StudentModel from "./../models/student.model.js";
import mongoose from "mongoose";

export const addStudent = async (req, res) => {
  try {
    const { id, name, collegeId, batch, skills, dateOfBirth } = req.body;

    const existingStudentCheck = await StudentModel.find({
      id: id,
      name: name,
      collegeId: collegeId,
    });

    if (existingStudentCheck.length === 0) {
      const studentData = new StudentModel({
        id: id,
        name: name,
        collegeId: collegeId,
        batch: batch,
        skills: skills,
        dateOfBirth: dateOfBirth,
      });

      studentData.save();

      if (studentData) {
        return res.status(201).json({
          message: "Student added successfully.",
          status: true,
          id: id,
        });
      } else {
        return res.status(500).json({
          message: "Some error Occured.",
          status: false,
        });
      }
    } else {
      return res.status(409).json({
        message: "Student already exists",
        status: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const getStudentByCollege = async (req, res) => {
  try {
    const { collegeId, limit, pageNo } = req.params;

    const skipNo = Number(pageNo) === 1 ? 0 : (Number(pageNo) - 1) * limit;

    let studentCount = await StudentModel.countDocuments({
      collegeId: collegeId,
    });

    const studentList = await StudentModel.find(
      {
        collegeId: collegeId,
      },
      { id: 1, name: 1, batch: 1, _id: 1 }
    )
      .limit(limit)
      .skip(skipNo);

    return res.status(200).json({
      studentList: studentList,
      studentCount: studentCount,
      message: "Students fetched successfully.",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const getStudentData = async (req, res) => {
  try {
    const { studentId } = req.params;

    // const studentData = await StudentModel.find({
    //   _id: studentId,
    // });

    const studentData = await StudentModel.aggregate([
      {
        $lookup: {
          from: "colleges",
          localField: "collegeId",
          foreignField: "id",
          as: "college",
        },
      },
      { $unwind: "$college" },
      {
        $match: {
          _id: new mongoose.Types.ObjectId(studentId),
        },
      },
      {
        $project: {
          name: "$name",
          id: "$id",
          collegeId: "$collegeId",
          batch: "$batch",
          dateOfBirth: "$dateOfBirth",
          skills: "$skills",
          collegeName: "$college.name",
        },
      },
    ]);

    return res.status(200).json({
      studentData: studentData,
      message: "Student fetched successfully.",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
