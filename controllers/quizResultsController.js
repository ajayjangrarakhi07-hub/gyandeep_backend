const QuizResult = require('../models/QuizResult');

// Save quiz result
const saveQuizResult = async (req, res) => {
    try {
        const { testId, testName, topicName, score, feedback, userName, userEmail } = req.body;

        // Validate required fields
        if (!testId || !testName || !topicName || !score || !userName || !userEmail) {
            return res.status(400).send('Missing required fields.');
        }

        // Create a new quiz result
        const newQuizResult = new QuizResult({
            testId,
            testName,
            topicName,
            score,
            feedback: feedback || null, // Use default value if feedback is not provided
            userName,
            userEmail,
        });

        await newQuizResult.save();
        res.status(200).json({ message: 'Quiz result saved successfully!', data: newQuizResult });
    } catch (error) {
        console.error('Error saving quiz result:', error);
        res.status(500).json({ message: 'Error saving quiz result.', error });
    }
};

// Get all quiz results
const getQuizResults = async (req, res) => {
    try {
        const results = await QuizResult.find().sort({ date: -1 }); // Sort by newest first
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching quiz results:', error);
        res.status(500).json({ message: 'Error fetching quiz results.', error });
    }
};

module.exports = { saveQuizResult, getQuizResults };
