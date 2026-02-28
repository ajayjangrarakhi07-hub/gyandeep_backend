const express = require("express");
const router = express.Router();

const {
    registerUser
} = require("../controllers/userController");

const deviceCheck =
    require("../middleware/deviceCheck");

const { checkDevice } = require("../controllers/userController"); // make sure export matches

// Device check route
router.post("/check-device", checkDevice);



/* REGISTER */

router.post(
    "/register",
    deviceCheck,
    registerUser
);

module.exports = router;