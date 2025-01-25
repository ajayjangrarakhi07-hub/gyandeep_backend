// routes/paidUserRoutes.js
const express = require('express');
const router = express.Router();
const {
    getAllPaidUsers,
    verifyPaidUser,
    addPaidUser,
} = require('../controllers/paidUserController');

router.get('/get-all-paid-user', getAllPaidUsers);
router.post('/verify-ispaid-user', verifyPaidUser);
router.post('/add-new-paid-user', addPaidUser);

module.exports = router;
