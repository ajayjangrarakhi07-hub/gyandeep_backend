const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    testName: { type: String, required: true },
    topicName: { type: String, required: true },
    score: { type: String, required: true },
    feedback: { type: String, default: null },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }, // Track when the result was last updated
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;
