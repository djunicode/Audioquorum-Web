// Importing modules
require('dotenv').config()

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Creating the schema
const userSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            minlength: [2, 'username too short!'],
            maxlength: [20, 'username too long!']
        },

        rollno: {
            type: Number,
            // required: true
        },

        password: {
            type: String,
            required: true,
            trim: true,
            minlength: [8, 'Password too short!'],
            maxlength: [128, 'Password too long!']
        },

        type: {
            type: String,
            required: true,
            enum: ["STUDENT", "TEACHER", "ADMIN"]
        },

        standard: {
            type: String
        },

        test: [{
            testId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Test'
            },

            marksObtained: {
                type: Number
            },

            average: {
                type: Number
            }
        }],

        totalMarks: {
            type: Number
        },

        testMarks: {
            type: Number
        },

        percentage: {
            type: Number
        },

        tokens: [{
            token: {
                type: String, 
                required: true
            }
        }]
    },
    { timestamps: true }
);

// Hashing the password
userSchema.pre('save', async function(next) {
    let currentUser = this;
    if(!currentUser.isModified('password')) { 
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        currentUser.password = await bcrypt.hash(currentUser.password, salt);
        return next();
    } catch(error) {
        return next(error);
    }
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET); 
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
} 
  
userSchema.statics.findByCredentials = async function ( username, password ) {
    const user = await this.findOne({ username });
  
    if(!user) {
        throw new Error('Unable to login');
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if(!isMatch) {
        throw new Error('Unable to login');
    }
  
    return user;
}

const User = mongoose.model('User', userSchema);

// Exporting the module
module.exports = User;