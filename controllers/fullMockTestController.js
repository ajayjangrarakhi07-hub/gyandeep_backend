const FullMockTest = require('../models/fullMockTest');

// Fetch all test subject names
exports.getAllTestSubjects = async (req, res) => {
    try {
        const testSubjects = await FullMockTest.find().select('testSubjectName -_id');
        res.status(200).json(testSubjects);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching test subjects.' });
    }
};

// Fetch test details by subject name
exports.getTestBySubjectName = async (req, res) => {
    try {
        const { testSubjectName } = req.params;
        const test = await FullMockTest.findOne({ testSubjectName });
        if (!test) return res.status(404).json({ error: 'Test not found.' });
        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching test details.' });
    }
};

// Admin route to add a new test
exports.addNewTest = async (req, res) => {
    try {
        const { testSubjectName, urlLinkOfTest, isTestLive } = req.body;

        // Validate fields
        if (!testSubjectName || !urlLinkOfTest) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const newTest = new FullMockTest({ testSubjectName, urlLinkOfTest, isTestLive });
        await newTest.save();
        res.status(201).json({ message: 'Test added successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding new test.' });
    }
};
