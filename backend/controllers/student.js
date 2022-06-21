// Import modules
const User = require('../models/user');
const Test = require('../models/test');

// View a student by their id mentioned in the body of the request
const viewStudentById = async (req, res) => {
    const id = req.body.id;

    try {
        // Find user by id
        const student = await User.findById(id);

        // Checking if the student exists
        if (!student) {
            res.status(404).json({
                message: 'User not found!'
            });
            return;
        }

        // Checking for unauthorized access
        if (student.type !== 'STUDENT') {
            res.status(403).json({
                message: 'Unauthorised Access'
            });
            return;
        }

        // Send student as data
        res.status(200).json({
            data: student
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        }); 
    }
    
}

const viewAllStudents = async (req, res) => {
    try {
        // Find all users with student type
        const students = await User.find({type: 'STUDENT'});

        // Checking for zero students
        if (students.length == 0) {
            res.status(404).json({
                message: 'No user found!'
            });
            return;
        }

        // Send students as data
        res.status(200).json({
            data: students
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        }); 
    }
}

const viewStudentsByTest = async (req, res) => {
    try {
        // Find test by id
        const currentTest = await Test.findById(req.params.testId);

        // Checking if the test exists
        if (!currentTest) {
            res.status(404).json({
                message: 'Test not found!'
            });
            return;
        }

        // Storing students data
        var students = [];
        for (let i = 0; i < currentTest.userIds.length; i++) {
            let user = await User.findById(currentTest.userIds[i]);
            students.push(user);
        }

        // Formatting Data;
        students.forEach((student) => {
            student.test = student.test.filter(function (entry) { 
                return String(entry.testId) === req.params.testId; 
            });

            student.username = undefined;
            student.password = undefined;
            student.totalMarks = undefined;
            student.testMarks = undefined;
            student.tokens = undefined;
        });
        
        // Send students data
        res.status(200).json({
            data: { currentTest, students }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const studentsAnnualReport = async (req, res) => {
    try {
        // Find all users with student type
        const students = await User.find({type: 'STUDENT'});

        // Checking for zero students
        if (students.length == 0) {
            res.status(404).json({
                message: 'No user found!'
            });
            return;
        }

        // Formatting the data
        students.forEach((student) => {
            student.username = undefined;
            student.password = undefined;
            student.test = undefined;
            student.testMarks = undefined;
            student.tokens = undefined;
        });

        // Send students as data
        res.status(200).json({
            data: students
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    viewStudentById, 
    viewAllStudents, 
    viewStudentsByTest, 
    studentsAnnualReport
};