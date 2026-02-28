const bcrypt = require("bcrypt");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

/* ================= CHECK DEVICE ================= */
exports.checkDevice = async (req, res) => {
    try {

        const { deviceId } = req.body;

        const existingDevice = await User.findOne({ deviceId });

        if (existingDevice) {
            return res.status(200).json({ exists: true });
        }

        return res.json({ exists: false });

    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};

/* ================= REGISTER ================= */
exports.registerUser = async (req, res) => {
    try {

        const {
            uid,
            fullName,
            mobile,
            email,
            password,
            state,
            district,
            village,
            pinCode,
            profileImage,
            referral,
            deviceId
        } = req.body;

        if (
            !uid ||
            !fullName ||
            !mobile ||
            !email ||
            !password ||
            !district ||
            !village ||
            !pinCode ||
            !profileImage ||
            !deviceId
        ) {
            return res.status(400).json({
                message: "All fields required"
            });
        }

        const exist = await User.findOne({ email: email.toLowerCase() });
        if (exist) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        let coins = 0;

        if (referral) {
            const refUser = await User.findOne({ referralCode: referral });
            if (refUser) {
                refUser.coins += 50;
                await refUser.save();
                coins = 25;
            }
        }

        const myReferral = require("uuid").v4().slice(0, 6).toUpperCase();

        const newUser = new User({
            uid,
            fullName,
            mobile,
            email: email.toLowerCase(),
            password: hashedPassword,
            state: state || "Haryana",
            district,
            village,
            pinCode,
            profileImage,
            referralCode: myReferral,
            deviceId,
            coins
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "Account Created"
        });

    } catch (err) {

        console.log("🔥 FULL REGISTER ERROR:");
        console.log(err);
        console.log("ERROR CODE:", err.code);
        console.log("KEY PATTERN:", err.keyPattern);

        return res.status(500).json({
            message: err.message
        });
    }
};