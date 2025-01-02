const Subject = require('../models/Subject');

// Save a new subject
exports.saveSubject = async (req, res) => {
    try {
        const subject = new Subject(req.body);
        await subject.save();
        res.status(201).json({ message: 'Subject saved successfully!', subject });
    } catch (error) {
        console.error('Error saving subject:', error.message);
        res.status(500).json({ message: 'Server error', error });
    }
};
// Get all subjects
exports.getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    } catch (error) {
        console.error('Error fetching subjects:', error.message);
        res.status(500).json({ message: 'Server error', error });
    }
};
