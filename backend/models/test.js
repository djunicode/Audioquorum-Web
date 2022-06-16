// Importing modules
const mongoose = require('mongoose');
const Question = require('./question');

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

        standard: {
            type: String
        },

        duration: {
            type: Number,
            required: true,
            trim: true
        },

        date: {
            type: String,
            required: true,
            trim: true
        },

        time: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: ["UPCOMING", "ONGOING", "COMPLETED"]
        },

        questionIds: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Question'
        },

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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        userIds: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User'
        }
    },
    { timestamps: true }
);

const Test = mongoose.model('Test', testSchema);

// Exporting modules
module.exports = Test;