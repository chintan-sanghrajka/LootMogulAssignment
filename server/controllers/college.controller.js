import CollegeModel from "./../models/college.model.js";

export const addCollege = async (req, res) => {
  try {
    const {
      id,
      name,
      yearFounded,
      location,
      state,
      rating,
      noOfStudents,
      courses,
    } = req.body;

    const existingCollegeCheck = await CollegeModel.find({
      $or: [{ id: id }, { name: name }],
    });

    if (existingCollegeCheck.length === 0) {
      const collegeData = new CollegeModel({
        id: id,
        name: name,
        yearFounded: yearFounded,
        location: location,
        state: state,
        rating: rating,
        noOfStudents: noOfStudents,
        courses: courses,
      });

      collegeData.save();

      if (collegeData) {
        return res.status(201).json({
          message: "College added successfully.",
          status: true,
        });
      } else {
        return res.status(500).json({
          message: "Some error Occured.",
          status: false,
        });
      }
    } else {
      return res.status(200).json({
        message: "College already present.",
        status: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const getCollegesByRating = async (req, res) => {
  try {
    const { limit } = req.params;

    const collegeListByRating = await CollegeModel.find(
      {},
      { id: 1, name: 1, location: 1, rating: 1, _id: 0 }
    )
      .sort({ rating: -1 })
      .limit(limit);

    res.status(200).json({
      collegeListByRating: collegeListByRating,
      message: "Colleges fetched successfully.",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const findColleges = async (req, res) => {
  try {
    const { userInput } = req.params;

    let searchQuery = {
      $or: [
        { id: { $regex: new RegExp(userInput, "i") } },
        { name: { $regex: new RegExp(userInput, "i") } },
      ],
    };

    const searchCollegesList = await CollegeModel.find(searchQuery, {
      id: 1,
      name: 1,
      _id: 0,
    });

    return res.status(200).json({
      searchCollegesList: searchCollegesList,
      messages: "Colleges fetched successfully.",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const getCollegeData = async (req, res) => {
  try {
    const { id } = req.params;

    const collegeData = await CollegeModel.find({
      id: id,
    });

    return res.status(200).json({
      collegeData: collegeData,
      message: "College Fetched Successfully.",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const getSimilarColleges = async (req, res) => {
  try {
    const { state, course, noOfStudents } = req.body;

    const similarCollegeList = await CollegeModel.find(
      {
        state: state,
        noOfStudents: {
          $gte: noOfStudents - 100,
          $lte: noOfStudents + 100,
        },
        courses: course,
      },
      { id: 1, name: 1, location: 1, _id: 0 }
    );

    return res.status(200).json({
      similarCollegeList: similarCollegeList,
      message: "Colleges Fetched Successfully.",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
