const QuizResult = require('../models/QuizResult');

const saveQuizResult = async (req, res) => {
    try {
        const { testName, topicName, score, userName, userEmail } = req.body;

        // Validate required fields
        if (!testName || !topicName || !score || !userName || !userEmail) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        // Check if a quiz result already exists for the same user and topic
        const existingResult = await QuizResult.findOne({ userEmail, topicName });

        if (existingResult) {
            // Clear the previous score (if necessary, explicitly set to 0 or null)
            existingResult.score = 0; // Clear previous score
            // Now, update with the new score
            existingResult.score = score;
            existingResult.updatedAt = new Date();

            const updatedResult = await existingResult.save();

            return res.status(200).json({
                message: 'Quiz result updated successfully!',
                data: updatedResult,
            });
        } else {
            // Create a new quiz result if not found
            const newQuizResult = new QuizResult({
                testName,
                topicName,
                score,
                userName,
                userEmail,
            });

            const savedResult = await newQuizResult.save();

            return res.status(200).json({
                message: 'Quiz result saved successfully!',
                data: savedResult,
            });
        }
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
