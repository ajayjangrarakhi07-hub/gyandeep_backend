const express = require('express');
const router = express.Router();
const { submitComment, getCommentsByTopicName, handleLike } = require('../controllers/discussionController');

// Route to submit a comment
router.post('/submit-comment', submitComment);

// Route to get all comments by topic name
router.get('/get-comments', getCommentsByTopicName);

// Route to handle like count
router.post('/like-comment', handleLike);

module.exports = router;
