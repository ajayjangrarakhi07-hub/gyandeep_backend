const express = require("express");
const router = express.Router();

const { updateLoginSession,registerUser, checkDevice, verifyPaidUser ,updatePaidStatus,getAllUsers,getPaidUsers,searchUsers } = require("../controllers/userController");
 
const deviceCheck = require("../middleware/deviceCheck");


const adminAuth = require("../middleware/adminAuth");



router.post("/check-device", checkDevice);

router.post("/register", deviceCheck, registerUser);

router.post("/update-login-session", updateLoginSession);

router.post("/verify-paid-user", verifyPaidUser);

router.post("/update-paid-status", adminAuth, updatePaidStatus);

router.get("/all-users", adminAuth, getAllUsers);
router.get("/paid-users", adminAuth, getPaidUsers);
router.get("/search-users", adminAuth, searchUsers);

module.exports = router;