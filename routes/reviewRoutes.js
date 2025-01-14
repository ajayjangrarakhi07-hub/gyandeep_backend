const express = require('express');
const { createReview, getReviews } = require('../controllers/reviewController');  // Import getReviews

const router = express.Router();

// Route to create a new review
router.post('/reviews', createReview);

// Route to fetch all reviews
router.get('/reviews', getReviews);  // This should work now
module.exports = router;
