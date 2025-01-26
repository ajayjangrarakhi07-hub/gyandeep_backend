const express = require('express');
const { getCarouselItems, addCarouselItem } = require('../controllers/carouselController');

const router = express.Router();

// Get all carousel items
router.get('/', getCarouselItems);

// Add a new carousel item
router.post('/', addCarouselItem);

module.exports = router;
