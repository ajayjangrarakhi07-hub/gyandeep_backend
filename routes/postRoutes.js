const express = require('express');
const router = express.Router();
const { createPost, createPosts, getPosts } = require('../controllers/PostController');

// Route to create a single post
router.post('/post', createPost);

// Route to create multiple posts
router.post('/posts', createPosts);

// Route to get all posts
router.get('/posts', getPosts);

module.exports = router;
