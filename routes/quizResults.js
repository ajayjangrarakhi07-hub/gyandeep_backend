const express = require('express');
const router = express.Router();
const { saveQuizResult, getQuizResults } = require('../controllers/quizResultsController');

// Route to save a quiz result
router.post('/save-quiz-result', saveQuizResult);

// Route to get all quiz results
router.get('/get-quiz-results', getQuizResults);

module.exports = router;
