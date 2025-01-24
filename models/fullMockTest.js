const mongoose = require('mongoose');

// Define the schema for FullMockTest
const fullMockTestSchema = new mongoose.Schema({
    testSubjectName: {
        type: String,
        required: [true, 'Test subject name is required.'],
        unique: true,
        trim: true,
    },
    urlLinkOfTest: {
        type: String,
        required: [true, 'URL link of test is required.'],
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+/.test(v); // Validates that the URL starts with http or https
            },
            message: 'Invalid URL format.',
        },
    },
    isTestLive: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('FullMockTest', fullMockTestSchema);
