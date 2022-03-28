// Importing modules
const mongoose = require('mongoose');

// Creating the schema
const testSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true 
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        subject: {
            type: String,
            required: true,
            trim: true
        },

        duration: {
            type: Number,
            required: true,
            trim: true
        },

        time: {
            type: String,
            required: true,
            trim: true
        },

        questionIds: [{
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Question'
        }],

        totalQuestions: {
            type: Number,
            required: true,
            trim: true
        },

        totalMarks: {
            type: Number,
            required: true,
            trim: true
        },

        teacherId: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User'
        },

        userIds: [{
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User'
        }]
    }
);

const Test = mongoose.model('Test', TestSchema);

// Exporting modules
module.exports = Test;