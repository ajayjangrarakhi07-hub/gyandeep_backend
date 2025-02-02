// routes/testSeriesRoutes.js
const express = require('express');
const router = express.Router();
const { getTestSeries, addTestSeries } = require('../controllers/testSeriesController');

router.get('/testSeries', getTestSeries);
router.post('/testSeries', addTestSeries);

module.exports = router;