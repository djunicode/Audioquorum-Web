const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const moment = require("moment");

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
       
        const currentUser = req.user;
       
        let newTest = new Test({...req.body, questionIds: questionIds, teacherId: currentUser._id});

        await newTest.save();

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
        
        // Check if the user has previously given the test
        if (currentUser.test.some(test => test.testId == req.body.testId)) {
            res.status(400).json({
                message: 'Test Already Attempted!',
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
        
        const currentTime = moment().format();

        // Date in the database should be in the format "YYYY-MM-DD" and time in "HH:MM:SS". Both string
        const dueDate = test.date;
        const dueTime = test.time;
        const dateTime = moment(`${dueDate} ${dueTime}`, 'YYYY-MM-DD HH:mm:ss').format();

        // Duration should be the number of minutes of the test
        const endTime = moment(dateTime).add(test.duration, 'minutes').format();
 
        if (currentTime > endTime) {
            res.status(400).json({
                message: 'Due time has passed',
            });
            return;
        }

        let testAverage = req.body.marks / test.totalMarks;
        currentUser.totalMarks = currentUser.totalMarks + req.body.marks;
        currentUser.testMarks = currentUser.testMarks + test.totalMarks;
        currentUser.percentage = (currentUser.totalMarks / currentUser.testMarks) * 100;

        currentUser.test.push({testId: test._id, marksObtained: req.body.marks, average: testAverage});
        
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
        
        const currentTime = moment().format();
        
        await Promise.all (tests.map(async (test) => {
        const dueDate = test.date;
        const dueTime = test.time;
        const dateTime = moment(`${dueDate} ${dueTime}`, 'YYYY-MM-DD HH:mm:ss').format();
        const endTime = moment(dateTime).add(test.duration, 'minutes').format();

        if (currentTime > endTime) {
            test.status = "COMPLETED";
        } else if (currentTime < dueTime) {
            test.status = "UPCOMING"
        } else {
            test.status = "ONGOING"
        }
        await test.save();
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