const mongoose = require("mongoose");

const paymentRequestSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
        },

        mobile: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            default: 49,
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "success", "failed"],
            default: "pending",
        },

        transactionId: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "PaymentRequest",
    paymentRequestSchema
);