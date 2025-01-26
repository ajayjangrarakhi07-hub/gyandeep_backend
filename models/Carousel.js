const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    link: {
        type: String, // Optional: For clickable actions
    },
}, { timestamps: true });

module.exports = mongoose.model('Carousel', carouselSchema);
