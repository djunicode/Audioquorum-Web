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

router.get('/viewByTest/:testId', [auth.verifyjwt, auth.userTypeTeacher], viewStudentsByTest);

router.get('/viewAnnualReport', [auth.verifyjwt, auth.userTypeTeacher], studentsAnnualReport);

// Exporting Modules
module.exports = router;