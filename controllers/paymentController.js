const PaymentRequest = require("../models/PaymentRequest");

// ===============================
// Create Payment Request
// ===============================
exports.createPaymentRequest = async (req, res) => {
    try {
        const { name, email, mobile, category, amount } = req.body;

        if (!name || !email || !mobile || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields required",
            });
        }

        const payment = new PaymentRequest({
            name,
            email,
            mobile,
            category,
            amount,
        });

        await payment.save();

        res.status(201).json({
            success: true,
            message: "Payment request created",
            data: payment,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};