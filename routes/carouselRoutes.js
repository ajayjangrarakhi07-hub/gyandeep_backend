const express = require('express');
const { getCarouselItems, addCarouselItem } = require('../controllers/carouselController');

const router = express.Router();

// Get all carousel items
router.get('/get-carousel-items', getCarouselItems);

// Add a new carousel item
router.post('/set-carousel-items', addCarouselItem);

module.exports = router;
