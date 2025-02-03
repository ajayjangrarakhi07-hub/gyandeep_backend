const mongoose = require('mongoose');

const testSeriesSchema = new mongoose.Schema({
    testSeriesName: { type: String, required: true },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/deujqrznl/image/upload/v1737561942/36-512_hhg5ri.webp'
    },
    testTimeDuration: {
        type: Number, // Store duration in seconds (e.g., 7200 for 2 hours)
        required: true
    },
    negativeMarking: {
        type: Number, // Example: 0.25 for 1/4th negative marking
        default: 0 // Default value is 0 (no negative marking)
    }
});

module.exports = mongoose.model('TestSeriesName', testSeriesSchema);
