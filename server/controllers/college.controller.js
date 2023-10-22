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
      return res.status(409).json({
        message: "College already present.",
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

export const getCollegesByRating = async (req, res) => {
  try {
    const { limit } = req.params;

    const collegeListByRating = await CollegeModel.find(
      {},
      { id: 1, name: 1, location: 1, rating: 1, _id: 0 }
    )
      .sort({ rating: -1 })
      .limit(limit);

    return res.status(200).json({
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
    const { state, course, noOfStudents, currentId } = req.body;

    let similarCollegeList = await CollegeModel.find(
      {
        state: state,
        noOfStudents: {
          $gte: noOfStudents - 2000,
          $lte: noOfStudents + 2000,
        },
        courses: course,
      },
      { id: 1, name: 1, location: 1, rating: 1, _id: 0 }
    );

    similarCollegeList = similarCollegeList.filter((college) => {
      return college.id !== currentId;
    });

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

export const getHomeStateWiseData = async (req, res) => {
  try {
    const stateList = await CollegeModel.distinct("state");

    const stateWiseData = await Promise.all(
      stateList.map(async (state) => {
        const collegeCount = await CollegeModel.countDocuments({
          state: state,
        });
        return { state, count: collegeCount };
      })
    );

    return res.status(200).json({
      stateWiseData: stateWiseData,
      message: "Data Fetched Successfully.",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const getColleges = async (req, res) => {
  try {
    const { action, value, limit, pageNo } = req.params;

    const skipNo = Number(pageNo) === 1 ? 0 : (Number(pageNo) - 1) * limit;
    if (action === "state") {
      let collegeCount = await CollegeModel.countDocuments({ state: value });

      let collegeList = await CollegeModel.find(
        {
          state: value,
        },
        { id: 1, name: 1, location: 1, rating: 1, _id: 0 }
      )
        .limit(limit)
        .skip(skipNo);
      return res.status(200).json({
        collegeList: collegeList,
        collegeCount: collegeCount,
        message: "Colleges Fetched Successfully.",
        status: true,
      });
    } else if (action === "course") {
      let collegeCount = await CollegeModel.countDocuments({ courses: value });
      let collegeList = await CollegeModel.find(
        {
          courses: value,
        },
        { id: 1, name: 1, location: 1, rating: 1, _id: 0 }
      )
        .limit(limit)
        .skip(skipNo);
      return res.status(200).json({
        collegeList: collegeList,
        collegeCount: collegeCount,
        message: "Colleges Fetched Successfully.",
        status: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const getHomeCourseWiseData = async (req, res) => {
  try {
    let collegeData = [];

    let courseList = await CollegeModel.aggregate([
      {
        $unwind: "$courses",
      },
      {
        $group: {
          _id: "$courses",
        },
      },
      {
        $project: {
          _id: 0,
          course: "$_id",
        },
      },
    ]);

    courseList = courseList.map((course) => {
      return course.course;
    });

    const coursePromises = [];

    for (const course of courseList) {
      const collegePromise = CollegeModel.aggregate([
        {
          $unwind: "$courses",
        },
        {
          $match: {
            courses: course,
          },
        },
        {
          $group: {
            _id: null,
            collegeCount: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ])
        .then((result) => {
          const collegeCount = result[0] ? result[0].collegeCount : 0;
          return { course: course, collegeCount };
        })
        .catch((error) => {
          return { course: course.course, collegeCount: 0 };
        });

      coursePromises.push(collegePromise);
    }

    collegeData = await Promise.all(coursePromises);

    res.status(200).json({
      message: "Data Fetched Successfully.",
      courseWiseData: collegeData,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
