const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');

// Importing modules
const Test = require('../models/test');
const Question = require('../models/question');

// Create Event
const createTest = async (req, res) => {
    try {
 
        const questionIds = []
        await Promise.all(req.body.questions.map( async (question) => {
            let newQuestion = new Question(question);
            await newQuestion.save();
            questionIds.push(newQuestion._id);
        }))
       
        // EDIT AFTER TESTING
        const currentUser = req.user ? req.user : {
            _id:3,
            name: "Rosita",
            username: "rosita07",
            type: "TEACHER",
            test: [{testId: 1, marksObtained: 5}, {testId: 3, marksObtained: 2}],
            standard: 3
        
        }
       
        let newTest = new Test({...req.body, questionIds: questionIds, teacherId: currentUser._id});

        // currentUser.testscreated.push(newTest._id);

        await newTest.save();
        // await currentUser.save();

        res.status(201).json({
            message: 'Test created successfully!',
            data: newTest
        })
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
}

// Give a test
const startTest = async (req, res) => {
    try {
        const test = await Test.findById(req.body.testId).populate('questionIds', 'teacherId');
        let currentUser = req.user;
        
        if(!test) {
            res.status(404).json({
                message: 'Test Not Found!',
            });
            return;
        }
        
        currentUser.test.push({testId: test._id, marksObtained: null});
        test.userIds.push(currentUser._id);

        await test.save();
        await currentUser.save();
        
        res.status(201).json({
            data: test,
            message: 'Test started successfully!'
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// End a test
const endTest = async (req, res) => {
    try {
        const test = await Test.findById(req.body.testId);
        let currentUser = req.user;
        
        if(!test) {
            res.status(404).json({
                message: 'Test Not Found!',
            });
            return;
        }
        
        currentUser.test.push({testId: test._id, marksObtained: req.body.marks});
        
        await currentUser.save();
        
        res.status(201).json({
            message: 'Test ended successfully!'
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// View the user's available tests by standard
const getTestsByStandard = async (req, res) => {
    try {
        const currentUser = req.user
        const standard = currentUser.standard
        let tests = await Test.find({standard});

        res.status(200).json({
            tests
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// View the user's attempted tests
const getAttemptedTests = async (req, res) => {
    try {

        const currentUser = req.user;

        const testsGiven = []
        currentUser.test.map((test) => {
            testsGiven.push(test.testId)
        })

        const tests = []
    
        await Promise.all (testsGiven.map(async (testId) => {
            const test = await Test.findById(testId);
            tests.push(test)
        }))
     
        res.status(200).json({
            tests
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {createTest, getTestsByStandard, getAttemptedTests, startTest, endTest}