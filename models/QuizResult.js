const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    testId: String,
    testName: String,
    topicName: String,
    score: String,
    feedback: { type: String, default: null },
    userNumberId: String,
    userEmail: String,
    date: { type: Date, default: Date.now }
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);
module.exports = QuizResult;
