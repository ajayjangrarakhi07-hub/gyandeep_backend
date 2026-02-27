const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    // ✅ Test Info
    testName: { type: String, required: true },
    topicName: { type: String, required: true },

    // ✅ User Info
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, index: true },

    // ✅ Score Info
    score: { type: String, required: true }, // example "75/100"
    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, default: 0 },
    incorrect: { type: Number, default: 0 },
    skipped: { type: Number, default: 0 },

    // ✅ Accuracy (for AI prediction)
    accuracy: { type: Number, default: 0 }, // %

    // ✅ Time Tracking
    timeTaken: { type: Number, default: 0 }, // seconds

    // ✅ Ranking System
    rank: { type: Number, default: 0 },
    percentile: { type: Number, default: 0 },

    // ✅ Weak Topic Detection
    weakTopics: {
        type: [String],
        default: []
    },

    // ✅ Attempted Questions
    userAttemptedList: {
        type: [
            {
                questionIndex: Number,
                selectedOption: String,
                isCorrect: Boolean,
                markedForReview: Boolean
            }
        ],
        default: []
    },

    // ✅ Improvement Tracking
    improvementScore: { type: Number, default: 0 },

    // ✅ AI Rank Prediction
    predictedRank: { type: Number, default: 0 },

    // ✅ Test Type (Mock / Topic / Live)
    testType: {
        type: String,
        default: "Mock"
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

module.exports = mongoose.model('QuizResult', quizResultSchema);