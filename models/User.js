const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    uid: {
        type: String,
        required: true,
        unique: true
    },

    fullName: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    state: {
        type: String,
        default: "Haryana"
    },

    district: {
        type: String,
        required: true
    },

    village: {
        type: String,
        required: true
    },

    pinCode: {
        type: String,
        required: true
    },

    profileImage: {
        type: String,
        required: true
    },

    referralCode: {
        type: String,
        default: null
    },

    coins: {
        type: Number,
        default: 0
    },

    deviceId: {
        type: String,
        required: true,
        unique: true
    },

    isPaidUser: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);