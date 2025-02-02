const mongoose = require('mongoose');

// Define the schema for questions
const questionSchema = new mongoose.Schema({
    question_number: {
        type: Number,
        required: true,
        default: function () {
            return this.parent().questions.length + 1; // Auto-increment question number
        }
    },
    question: { type: String, required: true },
    option1: { type: String, required: true },
    option2: { type: String, required: true },
    option3: { type: String, required: true },
    option4: { type: String, required: true },
    correctAnswer: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // Ensure correctAnswer matches one of the options
                return [this.option1, this.option2, this.option3, this.option4].includes(v);
            },
            message: 'Correct answer must match one of the options.',
        },
    },
    description: { type: String, required: true },
});

// Define the schema for FullMockTest
const fullMockTestSchema = new mongoose.Schema({
    testSeriesName: { // Added test series name for better filtering
        type: String,
        required: [true, 'Test series name is required.'],
        trim: true,
    },
    testSubjectName: {
        type: String,
        required: [true, 'Test subject name is required.'],
        trim: true,
    },
    urlLinkOfTest: {
        type: String,
        required: [true, 'URL link of test is required.'],
        validate: {
            validator: function (v) {
                return /^(https?:\/\/)([^\s$.?#].[^\s]*)$/.test(v); // Improved URL validation
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
