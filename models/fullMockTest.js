const mongoose = require('mongoose');

const fullMockTestSchema = new mongoose.Schema({
    testSubjectName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    urlLinkOfTest: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+/.test(v);
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
