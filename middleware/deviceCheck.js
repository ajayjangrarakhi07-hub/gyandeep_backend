const User = require("../models/User");

const deviceCheck = async (req, res, next) => {

    const { email, deviceId } = req.body;

    const user = await User.findOne({ email });

    if (user && user.deviceId !== deviceId) {
        return res.status(403).json({
            success: false,
            message:
                "Account already logged on another device"
        });
    }

    next();
};

module.exports = deviceCheck;