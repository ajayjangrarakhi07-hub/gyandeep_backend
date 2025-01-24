const express = require('express');
const {
    getAllTestSubjects,
    getTestBySubjectName,
    addNewTest,
} = require('../controllers/fullMockTestController');

const router = express.Router();

// Router to fetch all mock test all Data
 
router.get('/all-mock-test-data', getAllMockTests);

// Route to fetch all test subject names
router.get('/mock-test-subjects', getAllTestSubjects);

// Route to fetch test details by subject name
router.get('/mock-test/:testSubjectName', getTestBySubjectName);

// Admin route to add a new test
router.post('/add-mock-test', addNewTest);

module.exports = router;
