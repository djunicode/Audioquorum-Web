// Importing modules
const express = require('express');
const {
    createTest,
    getAttemptedTests,
    getTestsByStandard,
    startTest,
    endTest
    
} = require('../controllers/test');


// Initializing router
const router = new express.Router();

router.post('/create', createTest);
router.get('/attempted', getAttemptedTests);
router.get('/view', getTestsByStandard);
router.put('/start', startTest);
router.put('/end', endTest)

// Exporting Modules
module.exports = router;