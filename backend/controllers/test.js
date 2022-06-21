// Importing modules
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const moment = require('moment');
const Test = require('../models/test');
const Question = require('../models/question');
const User = require('../models/user');

// Create Event
const createTest = async (req, res) => {
    try {
        let currentUser = req.user;
        let questionIds = []
        await Promise.all(req.body.questions.map(async (question) => {
            let newQuestion = new Question(question);
            await newQuestion.save();
            questionIds.push(newQuestion._id);
        }))
       
       
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
        const currentTest = await Test.findById(req.body.testId).populate('questionIds').populate('teacherId');
        let currentUser = req.user;
        
        if(!currentTest) {
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

        const currentTime = moment().utcOffset("+05:30").format();
        
        // Date in the database should be in the format "YYYY-MM-DD" and time in "HH:MM:SS". Both string
        const dueDate = currentTest.date;
        const dueTime = currentTest.time;
        const startTime = moment(`${dueDate} ${dueTime}`, 'YYYY-MM-DD HH:mm:ss').format();

        // Duration should be the number of minutes of the test
        const endTime = moment(startTime).add(currentTest.duration, 'minutes').format();

        if (currentTime < startTime) {
            res.status(400).json({
                message: `Test hasn't started!`,
            });
            return;
        }
 
        if (currentTime > endTime) {
            res.status(400).json({
                message: 'Due time has passed!',
            });
            return;
        }

        currentUser.test.push({testId: currentTest._id, marksObtained: 0, average: 0});
        currentTest.userIds.push(currentUser._id);

        await currentTest.save();
        await currentUser.save();
        
        res.status(201).json({
            data: currentTest,
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
        const currentTest = await Test.findById(req.body.testId);
        let currentUser = req.user;
        
        if(!currentTest) {
            res.status(404).json({
                message: 'Test Not Found!',
            });
            return;
        }
        
        const currentTime = moment().utcOffset("+05:30").format();

        // Date in the database should be in the format "YYYY-MM-DD" and time in "HH:MM:SS". Both string
        const dueDate = currentTest.date;
        const dueTime = currentTest.time;
        const startTime = moment(`${dueDate} ${dueTime}`, 'YYYY-MM-DD HH:mm:ss').format();

        // Duration should be the number of minutes of the test
        const endTime = moment(startTime).add(currentTest.duration, 'minutes').format();

        if (currentTime < startTime) {
            res.status(400).json({
                message: `Test hasn't started!`,
            });
            return;
        }
 
        if (currentTime > endTime) {
            res.status(400).json({
                message: 'Due time has passed!',
            });
            return;
        }

        let testAverage = Number((req.body.marks / currentTest.totalMarks) * 100);
        currentUser.totalMarks = currentUser.totalMarks + Number(req.body.marks);
        currentUser.testMarks = currentUser.testMarks + currentTest.totalMarks;
        currentUser.percentage = (currentUser.totalMarks / currentUser.testMarks) * 100;

        currentUser.test.forEach((test) => {
            if (String(test.testId) === req.body.testId) {
                test.marksObtained = req.body.marks;
                test.average = testAverage;
            }
        });
        
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

// View all tests
const getAllTests = async (req, res) => {
    try {
        let tests = await Test.find({});
        if(tests.length === 0) {
            res.status(404).json({
                message: 'No tests found!'
            });
        } else {
            res.status(200).json({
                data: tests
            });
        }

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
            } else if (currentTime > dateTime && currentTime < endTime) {
                test.status = "ONGOING"
            } else if (currentTime < dateTime) {
                test.status = "UPCOMING"
            }
            await test.save();
        }));

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
        const currentUser =  await User.findById(req.user._id).populate('test.testId');
        console.log(currentUser);
        const standard = currentUser.standard
        let tests = await Test.find({ standard });
        
        const currentTime = moment().format();
        
        await Promise.all (tests.map(async (test) => {
            const dueDate = test.date;
            const dueTime = test.time;
            const dateTime = moment(`${dueDate} ${dueTime}`, 'YYYY-MM-DD HH:mm:ss').format();
            const endTime = moment(dateTime).add(test.duration, 'minutes').format();

            if (currentTime > endTime) {
                test.status = "COMPLETED";
            } else if (currentTime > dateTime && currentTime < endTime) {
                test.status = "ONGOING"
            } else if (currentTime < dateTime) {
                test.status = "UPCOMING"
            }
            await test.save();
        }));

        let attemptedTests = currentUser.test;
        
        res.status(200).json({
            attemptedTests
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// View Testbysubj
const getTestsBySubject = async (req, res) => {
    try {
        const testsubj = await Test.find({subject: req.params.subject})
        if(testsubj.length === 0) {
            res.status(404).json({
                message: 'No tests for this subject available'
            });
            return;
        } else {
            res.status(201).json({
                message: 'Found!',
                data: testsubj
            });
            return;
        }
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// View completed tests created by a teacher
const getCompletedTests = async (req, res) => {
    try {
        const currentUser = req.user;
        const testsCompleted = await Test.find({status: 'COMPLETED'});

        if (testsCompleted.length === 0) {
            res.status(404).json({
                message: 'Tests not found!'
            });
            return;
        }

        const tests = [];
        testsCompleted.forEach((test) => {
            if (String(currentUser._id) === String(test.teacherId)) {
                tests.push(test);
            }
        });

        
        if (tests.length === 0) {
            res.status(404).json({
                message: 'Tests not found!'
            });
            return;
        }
        
        res.status(200).json({
            data: tests
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }  
};

// View all subjects
const viewAllSubjects = async (req, res) => {
    try {

        
        // Find all tests
        const subjects = await Test.find().select('subject -_id');;

        // Checking for zero tests
        if (subjects.length == 0) {
            res.status(404).json({
                message: 'No test found!'
            });
            return;
        }
        
        // Get only the strings from the objects received
        const subjectNames = [];
        subjects.map(subject => subjectNames.push(subject.subject));

        // Remove duplicate occurrences of subject names
        let uniqueSubjects = [...new Set(subjectNames)];
    
        
        // Send subjects as data
        res.status(200).json({
            data: uniqueSubjects
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        }); 
    }
}

module.exports = {
    createTest, 
    startTest, 
    endTest, 
    getAllTests,
    getTestsByStandard, 
    getAttemptedTests, 
    getTestsBySubject,
    getCompletedTests,
    viewAllSubjects
};