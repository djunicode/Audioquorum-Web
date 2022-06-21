// Importing modules
const express = require('express');
const auth = require('../middlewares/auth');
const {
    createTest,
    startTest,
    endTest,   
    getAllTests,
    getTestsByStandard,
    getAttemptedTests,
    getTestsBySubject,
    getCompletedTests,
    viewAllSubjects
} = require('../controllers/test');


// Initializing router
const router = new express.Router();

router.post('/create', [auth.verifyjwt, auth.userTypeTeacher], createTest);

router.put('/start', [auth.verifyjwt, auth.userTypeStudent], startTest);

router.put('/end', [auth.verifyjwt, auth.userTypeStudent], endTest);

router.get('/view/All',[auth.verifyjwt,auth.userTypeTeacher], getAllTests);

router.get('/view/standard', [auth.verifyjwt, auth.userTypeStudent], getTestsByStandard);

router.get('/view/attempted', [auth.verifyjwt, auth.userTypeTeacherStudent], getAttemptedTests);

router.get('/view/TestbySubj/:subject',[auth.verifyjwt,auth.userTypeTeacher], getTestsBySubject);

router.get('/view/completed', [auth.verifyjwt, auth.userTypeTeacher], getCompletedTests);

router.get('/viewAllSubjects', [auth.verifyjwt, auth.userTypeTeacherStudent], viewAllSubjects);

// Exporting Modules
module.exports = router;