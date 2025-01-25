// routes/statusRoutes.js

const express = require("express");
const { updateStatus, getStatus } = require("../controllers/statusController");

const router = express.Router();

// Route to update the isPaidUser value
router.post("/set-the-ispaid-user-value", updateStatus);

// Route to get the current isPaidUser value
router.get("/get-ispaid-user-value", getStatus);

module.exports = router;
