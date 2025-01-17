const express = require('express');
const router = express.Router();
const { createPost, getPosts } = require('../controllers/PostController');

// Route to create a new post
router.post('/posts', createPost);
router.post('/posts', createPosts);


// Route to get all posts
router.get('/posts', getPosts);

module.exports = router;
