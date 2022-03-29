// Importing modules
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

        test: [{
            testId: {
                type: [mongoose.Schema.Types.ObjectId],
                ref: 'Test'
            },

            marksObtained: {
                type: String
            }
        }],

        tokens: [{
            token: {
                type: String, 
                required: true
            }
        }],
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

const User = mongoose.model('User', userSchema);

// Exporting the module
module.exports = User;