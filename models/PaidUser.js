// models/PaidUser.js
const mongoose = require('mongoose');

const PaidUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
});

module.exports = mongoose.model('PaidUser', PaidUserSchema);
