// Importing modules
const mongoose = require('mongoose');

// Creating the schema
const questionSchema = new mongoose.Schema(
    {
        questionNo: {
            type: String,
            required: true
        },

        question: {
            type: String,
            required: true
        },

        optionA: {
            type: String,
            required: true
        },

        optionB: {
            type: String,
            required: true
        },

        optionC: {
            type: String,
            required: true
        },

        optionD: {
            type: String,
            required: true
        },

        correctAnswer: {
            type: String,
            required: true
        },

        explanation: {
            type: String,
            required: true
        },

        marks: {
            type: Number,
            required: true
        },
    },
    {timestamps: true}
);

const Question = mongoose.model('Question', questionSchema);

// Exporting modules
module.exports = Question;