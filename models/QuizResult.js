const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    testName: { type: String, required: true },
    topicName: { type: String, required: true },
    score: { type: Number, required: true }, // Changed to Number for calculations
    incorrect: { type: Number, default: 0 }, // Default to 0
    userAttemptedList: { type: [String], default: [] }, // Default to empty array
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }, // Track when the result was last updated
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;
