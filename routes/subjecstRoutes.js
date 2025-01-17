const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// Add a subject
router.post('/save-subject', subjectController.saveSubject);

// Get all subjects
router.get('/get-subjects', subjectController.getSubjects);

// Route to get subject by name
router.get('/get-subject-by-name', subjectController.getSubjectByName);

 

// Route to update a lesson with new categories
router.put('/update-lesson/:name', subjectController.updateLesson);

module.exports = router;
