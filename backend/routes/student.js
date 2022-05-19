// importing modules
const express = require('express');
const auth = require('../middlewares/auth');
const {
    viewAllStudents,
    viewStudentById
} = require('../controllers/student');

const router = new express.Router();

router.get('/view', [auth.verifyjwt, auth.userTypeTeacher], viewStudentById);
router.get('/viewAll', [auth.verifyjwt, auth.userTypeTeacher], viewAllStudents);

// Exporting Modules
module.exports = router;