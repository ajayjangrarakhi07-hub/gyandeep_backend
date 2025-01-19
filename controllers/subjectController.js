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


// get name count image // Fetch subjects with limited fields
exports.getSubjectsSummary = async (req, res) => {
    try {
        // Fetch only name, count, and image_url fields
        const subjects = await Subject.find({}, 'id,name count image_url');
        res.status(200).json(subjects);
    } catch (error) {
        console.error('Error fetching subjects summary:', error.message);
        res.status(500).json({ message: 'Server error', error });
    }
};


// Get subject by name
// In your backend (subjectController.js)
exports.getSubjectByName = async (req, res) => {
    const subjectName = req.query.name;
    console.log('Received subject name:', subjectName);

    try {
        if (!subjectName) {
            return res.status(400).json({ message: 'Subject name is required' });
        }

        const subject = await Subject.findOne({ name: subjectName });

        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        console.log('Subject found:', subject);
        res.status(200).json(subject);
    } catch (error) {
        console.error('Error fetching subject:', error.message);
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

// Update lesson categories by subject name
exports.updateLesson = async (req, res) => {
    const subjectName = req.params.name;
    const { categories } = req.body;

    try {
        const updatedSubject = await Subject.findOneAndUpdate(
            { name: subjectName },
            { $set: { categories } },  // Set the updated categories
            { new: true }
        );
        res.json(updatedSubject);
    } catch (error) {
        console.error('Error updating subject:', error);
        res.status(500).json({ message: 'Failed to update lesson categories', error });
    }
};