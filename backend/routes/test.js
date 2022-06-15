// Importing modules
const express = require('express');
const auth = require('../middlewares/auth');
const {
    createTest,
    getAttemptedTests,
    getTestsByStandard,
    startTest,
    endTest   
} = require('../controllers/test');


// Initializing router
const router = new express.Router();

router.post('/create', [auth.verifyjwt, auth.userTypeTeacher], createTest);
router.get('/view/attempted', [auth.verifyjwt, auth.userTypeTeacherStudent], getAttemptedTests);

router.get('/view/standard', [auth.verifyjwt, auth.userTypeTeacher], getTestsByStandard);

router.put('/start', [auth.verifyjwt, auth.userTypeStudent], startTest);

router.put('/end', [auth.verifyjwt, auth.userTypeStudent], endTest)

// Exporting Modules
module.exports = router;