const express = require("express");
const router = express.Router();

const {
    registerUser
} = require("../controllers/userController");

const deviceCheck =
    require("../middleware/deviceCheck");

/* REGISTER */

router.post(
    "/register",
    deviceCheck,
    registerUser
);

module.exports = router;