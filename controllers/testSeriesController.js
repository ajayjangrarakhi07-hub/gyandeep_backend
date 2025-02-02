// controllers/testSeriesController.js
const TestSeriesName = require('../models/TestSeriesName');

exports.getTestSeries = async (req, res) => {
    try {
        const testSeries = await TestSeriesName.find();
        res.json(testSeries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addTestSeries = async (req, res) => {
    const { testSeriesName, image } = req.body;
    try {
        const newTestSeries = new TestSeriesName({ testSeriesName, image });
        await newTestSeries.save();
        res.status(201).json(newTestSeries);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};