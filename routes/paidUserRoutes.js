// routes/paidUserRoutes.js
const express = require('express');
const router = express.Router();
const User = require("../models/User");
const {
    getAllPaidUsers,
    verifyPaidUser,
    addPaidUser,
} = require('../controllers/paidUserController');

router.get('/get-all-paid-user', getAllPaidUsers);
router.post('/verify-ispaid-user', verifyPaidUser);
router.post('/add-new-paid-user', addPaidUser);

router.post("/verify-ispaid-user", async (req, res) => {
    try {
        const { email, mobile } = req.body;

        if (!email || !mobile) {
            return res.status(400).json({
                success: false,
                message: "Email and mobile required"
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase(),
            mobile
        });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        return res.json({
            success: true,
            isPaidUser: user.isPaidUser
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});



module.exports = router;
