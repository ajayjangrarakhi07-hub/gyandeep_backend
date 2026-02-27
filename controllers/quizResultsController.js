const QuizResult = require('../models/QuizResult');
 

const saveQuizResult = async (req, res) => {
    try {

        let {
            testName,
            topicName,
            score,
            incorrect,
            userName,
            userEmail,
            totalQuestions,
            timeTaken = 0,
            userAttemptedList = []
        } = req.body;

        if (!testName || !topicName || !score || !userEmail || !userName) {
            return res.status(400).json({ message: "Missing fields" });
        }

        userEmail = userEmail.trim().toLowerCase();
        testName = testName.trim();
        topicName = topicName.trim();

        incorrect = Number(incorrect);
        totalQuestions = Number(totalQuestions);

        // ✅ Extract Correct Answers from score "80/100"
        const correctAnswers = Number(score.split('/')[0]);

        // ✅ Accuracy Calculation
        const accuracy =
            totalQuestions > 0
                ? ((correctAnswers / totalQuestions) * 100).toFixed(2)
                : 0;

        // ✅ Weak Topic Detection
        let weakTopics = [];
        if (accuracy < 50) {
            weakTopics.push(topicName);
        }

        // ==========================
        // ✅ LIVE RANK CALCULATION
        // ==========================
        const betterUsers = await QuizResult.countDocuments({
            testName,
            correctAnswers: { $gt: correctAnswers }
        });

        const rank = betterUsers + 1;

        // ✅ Percentile
        const totalStudents =
            await QuizResult.countDocuments({ testName });

        const percentile =
            totalStudents > 0
                ? (((totalStudents - rank) / totalStudents) * 100).toFixed(2)
                : 0;

        // ✅ Rank Prediction (Simple AI Logic)
        const predictedRank =
            Math.max(1, Math.round(rank - accuracy / 10));

        // ==========================
        // CHECK EXISTING RESULT
        // ==========================
        let existingResult =
            await QuizResult.findOne({ userEmail, topicName });

        if (existingResult) {

            existingResult.score = score;
            existingResult.correctAnswers = correctAnswers;
            existingResult.totalQuestions = totalQuestions;
            existingResult.incorrect = incorrect;
            existingResult.accuracy = accuracy;
            existingResult.rank = rank;
            existingResult.percentile = percentile;
            existingResult.predictedRank = predictedRank;
            existingResult.timeTaken = timeTaken;
            existingResult.weakTopics = weakTopics;
            existingResult.userAttemptedList = userAttemptedList;
            existingResult.updatedAt = new Date();

            const updated = await existingResult.save();

            return res.status(200).json({
                message: "Quiz Updated Successfully",
                data: updated
            });

        } else {

            const newResult = new QuizResult({
                testName,
                topicName,
                score,
                incorrect,
                correctAnswers,
                totalQuestions,
                accuracy,
                rank,
                percentile,
                predictedRank,
                weakTopics,
                timeTaken,
                userAttemptedList,
                userName,
                userEmail
            });

            const saved = await newResult.save();

            return res.status(201).json({
                message: "Quiz Saved Successfully",
                data: saved
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            error
        });
    }
};
 
// Get quiz results by email
// Get all quiz results by email
const getQuizResults = async (req, res) => {
    const { userEmail } = req.query;

    try {
        const results = await QuizResult.find({
            userEmail: userEmail.trim().toLowerCase()
        }).sort({ createdAt: -1 });

        res.status(200).json(results || []);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching quiz results'
        });
    }
};

// Controller to fetch quiz by emailId and testName
const getQuizByEmailAndTopic = async (req, res) => {
    const { userEmail, testName } = req.query;

    if (!userEmail || !testName) {
        return res.status(400).json({
            error: 'userEmail and testName are required'
        });
    }

    try {

        const quizzes = await QuizResult.find({
            userEmail: userEmail.trim().toLowerCase(),
            testName: {
                $regex: new RegExp(`^${testName.trim()}$`, "i")
            }
        }).sort({ createdAt: -1 });

        // ✅ NEVER send 404 for empty data in mobile apps
        return res.status(200).json(quizzes || []);

    } catch (error) {
        console.error('Error fetching quizzes:', error);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};

module.exports = { saveQuizResult, getQuizResults, getQuizByEmailAndTopic };
