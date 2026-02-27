const express = require("express");
const router = express.Router();

const {
    createPaymentRequest,
} = require("../controllers/paymentController");

router.post("/payment-request", createPaymentRequest);

module.exports = router;