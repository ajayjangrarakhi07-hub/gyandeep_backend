const express = require('express');
const { createReview, getReviews } = require('../controllers/reviewController');

const router = express.Router();

// Route to create a new review
router.post('/reviews', createReview);
 
// Route to fetch all reviews
router.get('/reviews', getReviews);  
module.exports = router;
