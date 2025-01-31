const express = require('express');
const router = express.Router();
const { saveQuizResult, getQuizResults, getQuizByEmailAndTopic } = require('../controllers/quizResultsController');
 
// Define the route to get quiz by email and topic
router.get('/get-quiz-by-email-topic', getQuizByEmailAndTopic);

// Route to save a quiz result
router.post('/save-quiz-result', saveQuizResult);

// Route to get all quiz results
router.get('/get-quiz-results', getQuizResults);

module.exports = router;
