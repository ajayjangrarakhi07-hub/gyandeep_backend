// routes/carouselRoutes.js
const express = require('express');
const { getCarouselItems, addCarouselItem } = require('../controllers/carouselController');
const router = express.Router();

// Define the route for getting carousel items
router.get('/get-carousel-items', getCarouselItems);

// Define the route for adding a carousel item
router.post('/set-carousel-items', addCarouselItem);

module.exports = router;
