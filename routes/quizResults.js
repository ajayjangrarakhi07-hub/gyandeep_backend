const express = require('express');
const router = express.Router();
const { saveQuizResult, getQuizResults } = require('../controllers/quizResultsController');

router.post('/save-quiz-result', saveQuizResult);
router.get('/get-quiz-results', getQuizResults);

module.exports = router;
