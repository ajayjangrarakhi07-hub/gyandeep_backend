const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    positions: [
        {
            name: {
                type: String,
                required: true,
            },
            salary: {
                type: String,
                required: true,
            },
            about: {
                type: String,
                default: '',
            },
        },
    ],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
