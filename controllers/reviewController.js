const Review = require('../models/Review');

const createReview = async (req, res) => {
    try {
        const { userEmail, userName, feedback, rating } = req.body;

        // Check if all required fields are provided
        if (!userEmail ||!userName || !feedback || !rating) {
            return res.status(400).json({ message: 'Please provide all the required fields' });
        }

        // Create a new review document
        const newReview = new Review({
            userEmail,
            userName,
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



const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 }); // Sorting by the latest review
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch reviews', error });
    }
};

module.exports = { createReview, getReviews };
 
