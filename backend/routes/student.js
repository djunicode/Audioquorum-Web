// importing modules
const express = require('express');
const auth = require('../middlewares/auth');
const {
    viewAllStudents,
    viewStudentById,
    viewStudentsByTest,
    studentsAnnualReport
} = require('../controllers/student');

// Initializing router
const router = new express.Router();

router.get('/view', [auth.verifyjwt, auth.userTypeTeacher], viewStudentById);

router.get('/viewAll', [auth.verifyjwt, auth.userTypeTeacher], viewAllStudents);

router.get('/viewStudentsByTest', [auth.verifyjwt, auth.userTypeTeacher], viewStudentsByTest);

router.get('/studentsAnnualReport', [auth.verifyjwt, auth.userTypeTeacher], studentsAnnualReport);

// Exporting Modules
module.exports = router;