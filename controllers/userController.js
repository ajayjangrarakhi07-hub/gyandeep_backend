const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

/* ================= REGISTER ================= */

exports.registerUser = async (req, res) => {

    try {

        const {
            fullName,
            mobile,
            email,
            password,
            state,
            district,
            village,
            pinCode,
            profileImage,
            referralCode,
            deviceId
        } = req.body;

        /* ===== VALIDATION ===== */

        if (
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

        /* ===== EXIST USER ===== */

        const exist =
            await User.findOne({ email });

        if (exist)
            return res.status(400).json({
                message: "User already exists"
            });

        /* ===== REFERRAL BONUS ===== */

        let coins = 0;

        if (referralCode) {
            const refUser =
                await User.findOne({
                    referralCode
                });

            if (refUser) {
                refUser.coins += 50;
                await refUser.save();
                coins = 25;
            }
        }

        /* ===== CREATE OWN REF CODE ===== */

        const myReferral =
            uuidv4().slice(0, 6).toUpperCase();

        const newUser = new User({
            fullName,
            mobile,
            email: email.toLowerCase(),
            password,
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

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });
    }
};