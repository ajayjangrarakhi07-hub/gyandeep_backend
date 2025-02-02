const FullMockTest = require('../models/fullMockTest');


const FullMockTest = require('../models/fullMockTest'); // Import FullMockTest model

// Controller to fetch all mock tests by testSeriesName
exports.getAllMockTests = async (req, res) => {
    try {
        const { testSeriesName } = req.query;
        let query = {};

        // If testSeriesName is provided, filter results by testSeriesName
        if (testSeriesName) {
            query.testSeriesName = { $regex: new RegExp(testSeriesName, 'i') }; // Case-insensitive match
        }

        // Fetch filtered mock tests from the database
        const mockTests = await FullMockTest.find(query).sort({ createdAt: -1 });

        // Send response
        res.status(200).json({
            success: true,
            message: 'Mock tests fetched successfully',
            data: mockTests,
        });
    } catch (error) {
        console.error('Error fetching mock tests:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching mock tests',
            error: error.message,
        });
    }
};




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


exports.addNewTest = async (req, res) => {
    try {
        const { testSubjectName, urlLinkOfTest, isTestLive } = req.body;

        // Check required fields
        if (!testSubjectName || !urlLinkOfTest) {
            return res.status(400).json({ error: 'testSubjectName and urlLinkOfTest are required fields.' });
        }

        // Create and save new test
        const newTest = new FullMockTest({ testSubjectName, urlLinkOfTest, isTestLive });
        await newTest.save();

        res.status(201).json({ message: 'Test added successfully.', test: newTest });
    } catch (error) {
        console.error('Error in addNewTest controller:', error);
        if (error.code === 11000) {
            res.status(400).json({ error: 'Test subject name must be unique.' });
        } else {
            res.status(500).json({ error: 'An error occurred while adding the test.' });
        }
    }
};
