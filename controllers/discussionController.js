const Discussion = require('../models/Discussion');

// Submit a new comment (discussion)
const submitComment = async (req, res) => {
    try {
        const { userName, testName, topicName, comment } = req.body;

        if (!userName || !testName || !topicName || !comment) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        const newDiscussion = new Discussion({
            userName,
            testName,
            topicName,
            comment,
        });

        await newDiscussion.save();

        res.status(201).json({ message: 'Comment submitted successfully!', data: newDiscussion });
    } catch (error) {
        console.error('Error submitting comment:', error);
        res.status(500).json({ message: 'Error submitting comment.', error });
    }
};

// Fetch comments by topic name
const getCommentsByTopicName = async (req, res) => {
    try {
        const { topicName } = req.query;

        if (!topicName) {
            return res.status(400).json({ message: 'Topic name is required.' });
        }

        const discussions = await Discussion.find({ topicName }).sort({ createdAt: -1 });

        res.status(200).json(discussions);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Error fetching comments.', error });
    }
};

// Handle like count
const handleLike = async (req, res) => {
    try {
        const { discussionId } = req.body;

        if (!discussionId) {
            return res.status(400).json({ message: 'Discussion ID is required.' });
        }

        const discussion = await Discussion.findById(discussionId);

        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found.' });
        }

        // Increment the likes count
        discussion.likesCount += 1;

        await discussion.save();

        res.status(200).json({ message: 'Like added successfully!', data: discussion });
    } catch (error) {
        console.error('Error handling like:', error);
        res.status(500).json({ message: 'Error handling like.', error });
    }
};

module.exports = { submitComment, getCommentsByTopicName, handleLike };
