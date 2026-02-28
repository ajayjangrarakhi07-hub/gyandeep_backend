const User = require("../models/User");

const deviceCheck = async (req, res, next) => {

    try {

        const { email, deviceId } = req.body;

        const user = await User.findOne({ email });

        /* Allow signup if user not exist */
        if (!user) return next();

        /* Block only existing login */
        if (user.deviceId !== deviceId) {
            return res.status(403).json({
                success: false,
                message: "Account already used on another device"
            });
        }

        next();

    } catch (err) {
        next();
    }
};

module.exports = deviceCheck;