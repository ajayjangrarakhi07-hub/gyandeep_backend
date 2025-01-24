const express = require('express');
const {
    getAllTestSubjects,
    getTestBySubjectName,
    addNewTest,
} = require('../controllers/fullMockTestController');

const router = express.Router();

// Fetch all test subject names
router.get('/test-subjects', getAllTestSubjects);

// Fetch test details by subject name
router.get('/test/:testSubjectName', getTestBySubjectName);

// Admin route to add a new test
router.post('/add-test', addNewTest);

module.exports = router;
