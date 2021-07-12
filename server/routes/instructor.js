import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// controllers
import {
  makeInstructor,
  currentInstructor,
  instructorCourses,
  studentCount,
  getInstructor
  
} from "../controllers/instructor";

router.post("/make-instructor", requireSignin, makeInstructor);

router.get("/current-instructor", requireSignin, currentInstructor);

router.get("/get-instructor", requireSignin, getInstructor);

router.get("/instructor-courses", requireSignin, instructorCourses);

router.post("/instructor/student-count", requireSignin, studentCount);

// router.post("/instructor/walletmoney", requireSignin, walletMoney);


module.exports = router;
