const QuizResult = require('../models/QuizResult');

const saveQuizResult = async (req, res) => {
    try {
        const { testName, topicName, score, incorrect, userName, userEmail, userAttemptedList = [] } = req.body;

        // Validate required fields
        if (!testName || !topicName || score === undefined || incorrect === undefined || !userName || !userEmail) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        // Ensure `userAttemptedList` is an array
        if (!Array.isArray(userAttemptedList)) {
            return res.status(400).json({ message: 'userAttemptedList must be an array.' });
        }

        // Check if a quiz result already exists for the same user and topic
        let existingResult = await QuizResult.findOne({ userEmail, topicName });

        if (existingResult) {
            // Update existing record
            existingResult.score = score;
            existingResult.incorrect = incorrect; // Now taking input instead of calculating
            existingResult.userAttemptedList = userAttemptedList;
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
                incorrect,
                userAttemptedList,
                userName,
                userEmail,
                updatedAt: new Date(),
            });

            const savedResult = await newQuizResult.save();

            return res.status(201).json({
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

// Controller to fetch quiz by emailId and testName
const getQuizByEmailAndTopic = async (req, res) => {
    const { userEmail, testName } = req.query;

    if (!userEmail || !testName) {
        return res.status(400).json({ error: 'userEmail and testName are required' });
    }

    try {
        // Use find() instead of findOne() to return all matching quizzes
        const quizzes = await QuizResult.find({ userEmail, testName });

        if (!quizzes || quizzes.length === 0) {
            return res.status(404).json({ message: 'No quiz found for this userEmail and testName' });
        }

        return res.status(200).json(quizzes);  // Send the array of quizzes
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { saveQuizResult, getQuizResults, getQuizByEmailAndTopic };
