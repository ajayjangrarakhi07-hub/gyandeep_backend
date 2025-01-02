const QuizResult = require('../models/QuizResult');

// Save quiz result
const saveQuizResult = async (req, res) => {
    try {
        const { testId, testName, topicName, score, feedback, userNumberId, userEmail } = req.body;

        const newQuizResult = new QuizResult({
            testId,
            testName,
            topicName,
            score,
            feedback,
            userNumberId,
            userEmail,
        });
        console.log(newQuizResult);
        await newQuizResult.save();
        res.status(200).send('Quiz result saved successfully!');
    } catch (error) {
        console.error('Error saving quiz result:', error);
        res.status(500).send('Error saving quiz result.');
    }
};

// Get all quiz results
const getQuizResults = async (req, res) => {
    try {
        const results = await QuizResult.find();
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching quiz results:', error);
        res.status(500).send('Error fetching quiz results.');
    }
};

module.exports = { saveQuizResult, getQuizResults };
