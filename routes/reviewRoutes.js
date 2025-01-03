const express = require('express');
const { createReview } = require('../controllers/reviewController');

const router = express.Router();

// Route to create a new review
router.post('/reviews', createReview);

module.exports = router;
