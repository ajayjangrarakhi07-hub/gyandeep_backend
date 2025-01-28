const mongoose = require('mongoose');

// Define the schema for questions
const questionSchema = new mongoose.Schema({
    question_number: { type: Number, required: true },
    question: { type: String, required: true },
    options: {
        type: [String], // Array of strings for options
        validate: {
            validator: function (v) {
                return v.length === 4; // Ensures exactly 4 options
            },
            message: 'Exactly 4 options are required.',
        },
        required: true,
    },
    correctAnswer: { type: String, required: true }, // Must match one of the options
    description: { type: String, required: true },
});

// Define the schema for FullMockTest
const fullMockTestSchema = new mongoose.Schema({
    testSubjectName: {
        type: String,
        required: [true, 'Test subject name is required.'],
        unique: true,
        trim: true,
    },
    urlLinkOfTest: {
        type: String,
        required: [true, 'URL link of test is required.'],
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+/.test(v); // Validates URL format
            },
            message: 'Invalid URL format.',
        },
    },
    isTestLive: {
        type: Boolean,
        default: false,
    },
    questions: [questionSchema], // Embed the questions schema
}, { timestamps: true });

module.exports = mongoose.model('FullMockTest', fullMockTestSchema);
