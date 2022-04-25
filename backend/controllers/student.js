// Import modules
const User = require("../models/user")

// View a student by their id mentioned in the body of the request
const viewStudentById = async (req, res) => {
    const id = req.body.id;

    try {
        // Find user by id
        const student = await User.findById(id);

        // Send student as data
        res.status(200).json({
            data: student
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        }); 
    }
    
}

const viewAllStudents = async (req, res) => {
    try {
        // Find all users with student type
        const students = await User.find({type: 'STUDENT'});

        // Send students as data
        res.status(200).json({
            data: students
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        }); 
    }
}

module.exports = {viewStudentById, viewAllStudents}