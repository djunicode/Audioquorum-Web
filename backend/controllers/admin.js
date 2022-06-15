// Importing Modules
const User = require('../models/user.js');

// Create User
const createUser = async (req, res) => {
    try {
        let newUser = new User(req.body);
        
        newUser.totalMarks = Number(0);
		newUser.testMarks = Number(0);
		newUser.percentage = Number(0);

        await newUser.save();

        res.status(201).json({
            message: 'User created!'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// View One User
const viewUser = async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        if (!currentUser) {
            res.status(404).json({
               message: 'User not found!' 
            });
            return;
        }

        res.status(200).json({
            message: 'User found',
            data: currentUser
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// View All Users
const viewAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        if(allUsers.length === 0) {
            res.status(404).json({
                message: 'No users found!'
            });
        } else {
            res.status(200).json({
                data: allUsers
            });
        }
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Update User
const updateUser = async (req, res) => {
    try {
        const currentUser = await User.findByIdAndUpdate(req.body.userId, req.body, {new: true});
        if (!currentUser) {
            res.status(404).json({
                message: 'User not found!'
            });
        } else {
            res.status(201).json({
                message: 'User updated!',
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        const currentUser = await User.findByIdAndDelete(req.body.userId);
        if (!currentUser) {
            res.status(404).json({
                message: "User not found!"
            });
        } else {
             res.status(200).json({
                 message: "User deleted!"
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Exporting Modules 
module.exports = {
    createUser,
    viewUser,
    viewAllUsers,
    updateUser,
    deleteUser
};