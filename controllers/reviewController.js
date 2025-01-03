const Review = require('../models/Review');

const createReview = async (req, res) => {
    try {
        const { userEmail, feedback, rating } = req.body;

        // Check if all required fields are provided
        if (!userEmail || !feedback || !rating) {
            return res.status(400).json({ message: 'Please provide all the required fields' });
        }

        // Create a new review document
        const newReview = new Review({
            userEmail,
            feedback,
            rating,
        });

        // Save the review to the database
        await newReview.save();

        // Respond with a success message
        res.status(201).json({
            message: 'Review submitted successfully!',
            review: newReview,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to submit review', error });
    }
};

module.exports = { createReview };
