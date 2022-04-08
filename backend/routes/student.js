// importing modules
const express = require('express');
const {
    viewAllStudents,
    viewStudentById
} = require('../controllers/student');

const router = new express.Router();

router.get('/view', viewStudentById);
router.get('/viewAll', viewAllStudents);


// Exporting Modules
module.exports = router;