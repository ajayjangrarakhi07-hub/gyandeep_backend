// controllers/statusController.js

const StatusOfAppFreeorPaid = require("../models/StatusOfAppFreeorPaid");

// Controller to update the isPaidUser value
const updateStatus = (req, res) => {
    const { isPaidUser } = req.body;

    if (typeof isPaidUser !== "boolean") {
        return res.status(400).json({ message: "Invalid isPaidUser value. It must be a boolean." });
    }

    StatusOfAppFreeorPaid.isPaidUser = isPaidUser;
    return res.status(200).json({
        message: "isPaidUser value updated successfully.",
        status: StatusOfAppFreeorPaid,
    });
};

// Controller to get the current isPaidUser value
const getStatus = (req, res) => {
    return res.status(200).json({ status: StatusOfAppFreeorPaid });
};

module.exports = {
    updateStatus,
    getStatus,
};
