const express = require('express');
const {
    getAllTestSubjects,
    getTestBySubjectName,
    addNewTest,
} = require('../controllers/fullMockTestController');

const router = express.Router();

// Route to fetch all test subject names
router.get('/test-subjects', getAllTestSubjects);

// Route to fetch test details by subject name
router.get('/test/:testSubjectName', getTestBySubjectName);

// Admin route to add a new test
router.post('/add-test', addNewTest);

module.exports = router;
