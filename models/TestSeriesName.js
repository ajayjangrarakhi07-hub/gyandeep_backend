// models/TestSeriesName.js
const mongoose = require('mongoose');

const testSeriesSchema = new mongoose.Schema({
    testSeriesName: { type: String, required: true },
    image: { type: String, default: 'https://res.cloudinary.com/deujqrznl/image/upload/v1737561942/36-512_hhg5ri.webp' }
});

module.exports = mongoose.model('TestSeriesName', testSeriesSchema);