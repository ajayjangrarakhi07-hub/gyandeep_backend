const mongoose = require('mongoose');

// Discussion Schema
const discussionSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    testName: { type: String, required: true },
    topicName: { type: String, required: true },
    comment: { type: String, required: true },
    likesCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
