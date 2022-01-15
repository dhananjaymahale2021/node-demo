const express = require("express");
const dbConnection = require("../helpers/dbConnection");
const studentController = require("../controller/studentController");

// router which helps user module to add all the routes to the main app
const router = express.Router();

router.get("/", (request, response) => {
  response.send("Welcome to student management system");
});

// Get student list by criteria
router.get("/students", studentController.getAllStudents);

// Get student by roll no
router.get("/students/:rollNo", studentController.getStudentByRollNo);

// Delete Student by rollNo
router.delete("/students/:rollNo", studentController.deleteStudentByRollNo);

// create student
router.post("/students", studentController.createStudent);

// Update the student
router.patch("/students/:rollNo", studentController.patchStudent);

// used to export the router which has all the apis added
module.exports = router;