const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    testName: { type: String, required: true },
    topicName: { type: String, required: true },
    score: { type: String, required: true }, // Score as a string (e.g., "1/100")
    incorrect: { type: Number, default: 0 }, // Default to 0
    userAttemptedList: { type: [{ questionIndex: Number, selectedOption: String }], default: [] }, // Array of objects
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;
