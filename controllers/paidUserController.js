// controllers/paidUserController.js
const PaidUser = require('../models/PaidUser');

// Get all paid users
exports.getAllPaidUsers = async (req, res) => {
    try {
        const paidUsers = await PaidUser.find();
        res.status(200).json({ success: true, data: paidUsers });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Verify if a user exists
exports.verifyPaidUser = async (req, res) => {
    const { email, mobileNumber } = req.body;

    try {
        const user = await PaidUser.findOne({ email, mobileNumber });
        if (user) {
            return res.status(200).json({ success: true, message: 'User is a paid user' });
        } else {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Add a new paid user
exports.addPaidUser = async (req, res) => {
    const { email, mobileNumber } = req.body;

    try {
        const newUser = new PaidUser({ email, mobileNumber });
        await newUser.save();
        res.status(201).json({ success: true, message: 'User added successfully', data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add user', error });
    }
};
