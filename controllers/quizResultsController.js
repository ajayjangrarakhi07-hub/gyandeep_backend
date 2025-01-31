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

// Get quiz results by email
const getQuizResults = async (req, res) => {
    const { userEmail } = req.query; // Get userEmail from query params
    try {
        // Find quiz results matching the email, sorted by date (newest first)
        const results = await QuizResult.find({ userEmail : userEmail }).sort({ date: -1 });
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching quiz results:', error);
        res.status(500).json({ message: 'Error fetching quiz results.', error });
    }
};

// Controller to fetch quiz by emailId and topicName
const getQuizByEmailAndTopic = async (req, res) => {
    const { emailId, topicName } = req.query;

    if (!emailId || !topicName) {
        return res.status(400).json({ error: 'emailId and topicName are required' });
    }

    try {
        // Find quiz by emailId and topicName
        const quiz = await QuizResult.findOne({ emailId, topicName });

        if (!quiz) {
            return res.status(404).json({ message: 'No quiz found for this email and topic' });
        }

        return res.status(200).json(quiz);  // Send the quiz data back to the client
    } catch (error) {
        console.error('Error fetching quiz:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { saveQuizResult, getQuizResults, getQuizByEmailAndTopic };
