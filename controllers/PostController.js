const Post = require('../models/PostModel');

exports.createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create post', error });
    }
};
exports.createPosts = async (req, res) => {
    try {
        const { posts } = req.body;

        // Ensure the posts data is in the correct format
        if (!Array.isArray(posts)) {
            return res.status(400).json({ message: 'Invalid data format. Expected an array of posts.' });
        }

        // Insert multiple posts at once
        const newPosts = await Post.insertMany(posts);

        // Return success response
        res.status(201).json({ message: 'Posts created successfully', posts: newPosts });
    } catch (error) {
        res.status(500).json({ message: 'Error creating posts', error });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error });
    }
};
