const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

 

/* ================= CHECK DEVICE ================= */

exports.checkDevice = async (req, res) => {

    try {

        const { deviceId } = req.body;

        const existingDevice =
            await User.findOne({ deviceId });

        if (existingDevice) {
            return res.status(200).json({
                exists: true
            });
        }

        res.json({ exists: false });

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
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
            state,
            district,
            village,
            pinCode,
            profileImage,
            referral,
            deviceId
        } = req.body;

        /* ===== VALIDATION ===== */

        if (
            !uid ||
            !fullName ||
            !mobile ||
            !email ||
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

        /* ===== EXIST USER ===== */

        const exist = await User.findOne({ email });

        if (exist)
            return res.status(400).json({
                message: "User already exists"
            });

        /* ===== REFERRAL BONUS ===== */

        let coins = 0;

        if (referral) {
            const refUser = await User.findOne({
                referralCode: referral
            });

            if (refUser) {
                refUser.coins += 50;
                await refUser.save();
                coins = 25;
            }
        }

        /* ===== CREATE OWN REF CODE ===== */

        const myReferral = uuidv4()
            .slice(0, 6)
            .toUpperCase();

        const newUser = new User({
            uid,
            fullName,
            mobile,
            email: email.toLowerCase(),
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

        res.json({
            success: true,
            message: "Account Created",
            referralCode: myReferral
        });

    } catch (err) {
        console.log("REGISTER ERROR:", err);
        res.status(500).json({
            message: "Server Error"
        });
    }
};