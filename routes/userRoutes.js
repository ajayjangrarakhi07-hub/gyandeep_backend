const express = require("express");
const router = express.Router();

const { registerUser, checkDevice } = require("../controllers/userController");
const deviceCheck = require("../middleware/deviceCheck");

router.post("/check-device", checkDevice);

router.post("/register", deviceCheck, registerUser);

module.exports = router;