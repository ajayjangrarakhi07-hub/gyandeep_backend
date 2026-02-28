const User = require("../models/User");

const deviceCheck = async (req, res, next) => {

    try {

        const { email, deviceId } = req.body;

        if (!email) return next();

        

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) return next();

        if (user.deviceId !== deviceId) {
            return res.status(403).json({
                success: false,
                message: "Account already used on another device"
            });
        }

        next();

    } catch (err) {
        return res.status(500).json({ message: "Server Error" });
    }
};

module.exports = deviceCheck;