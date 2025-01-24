const FullMockTest = require('../models/fullMockTest');

// Controller to fetch all test subject names
exports.getAllTestSubjects = async (req, res) => {
    try {
        const testSubjects = await FullMockTest.find().select('testSubjectName -_id');
        res.status(200).json(testSubjects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching test subjects.' });
    }
};

// Controller to fetch test details by subject name
exports.getTestBySubjectName = async (req, res) => {
    try {
        const { testSubjectName } = req.params;
        const test = await FullMockTest.findOne({ testSubjectName });
        if (!test) {
            return res.status(404).json({ error: 'Test not found.' });
        }
        res.status(200).json(test);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching test details.' });
    }
};

// Controller to add a new test
exports.addNewTest = async (req, res) => {
    try {
        const { testSubjectName, urlLinkOfTest, isTestLive } = req.body;

        // Check if all required fields are provided
        if (!testSubjectName || !urlLinkOfTest) {
            return res.status(400).json({ error: 'Test subject name and URL link of test are required.' });
        }

        // Create and save the new test
        const newTest = new FullMockTest({ testSubjectName, urlLinkOfTest, isTestLive });
        await newTest.save();

        res.status(201).json({ message: 'Test added successfully.', test: newTest });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            res.status(400).json({ error: 'Test subject name must be unique.' });
        } else {
            res.status(500).json({ error: 'An error occurred while adding the test.' });
        }
    }
};
