import User from "../models/user";
import Course from "../models/course";
import queryString from "query-string";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

export const makeInstructor = async (req, res) => {
  try {
  
    const user = await User.findByIdAndUpdate(
        req.user._id,
        { role: "Instructor" }
      ).exec();
      res.json(user);
  } catch (err) {
    console.log("MAKE INSTRUCTOR ERR ", err);
  }
};


export const currentInstructor = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select("-password").exec();
    // console.log("CURRENT INSTRUCTOR => ", user);
    if (!user.role.includes("Instructor")) {
      return res.sendStatus(403);
    } else {
      res.json({ ok: true });
    }
  } catch (err) {
    console.log(err);
  }
};

export const instructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id })
      .sort({ createdAt: -1 })
      .exec();
    res.json(courses);
  } catch (err) {
    console.log(err);
  }
};

export const studentCount = async (req, res) => {
  try {
    const users = await User.find({ courses: req.body.courseId })
      .select("_id")
      .exec();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};


export const getInstructor = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select("-password").exec();
    // console.log("CURRENT INSTRUCTOR => ", user);
    if (!user.role.includes("Instructor")) {
      return res.sendStatus(403);
    } else {
      res.json(user);
    }
  } catch (err) {
    console.log(err);
  }
};



