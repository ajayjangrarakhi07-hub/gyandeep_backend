const express = require("express");
const router = express.Router();

const { registerUser, checkDevice, verifyPaidUser ,updatePaidStatus } = require("../controllers/userController");
const deviceCheck = require("../middleware/deviceCheck");

const adminAuth = require("../middleware/adminAuth");

router.post("/check-device", checkDevice);

router.post("/register", deviceCheck, registerUser);

router.post("/verify-paid-user", verifyPaidUser);

router.post("/update-paid-status", adminAuth, updatePaidStatus);

module.exports = router;