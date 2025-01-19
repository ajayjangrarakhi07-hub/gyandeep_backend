const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    testId: { type: String, required: true },
    testName: { type: String, required: true },
    topicName: { type: String, required: true },
    score: { type: String, required: true },
    feedback: { type: String, default: null },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Automatically sets the creation date
});

module.exports = mongoose.model('QuizResult', quizResultSchema);
