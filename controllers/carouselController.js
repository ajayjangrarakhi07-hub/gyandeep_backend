const Carousel = require('../models/Carousel');

// Fetch all carousel items
exports.getCarouselItems = async (req, res) => {
    try {
        const items = await Carousel.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch carousel items', error });
    }
};

// Add a new carousel item
exports.addCarouselItem = async (req, res) => {
    const { image, caption, link } = req.body;

    if (!image || !caption) {
        return res.status(400).json({ message: 'Image and caption are required' });
    }

    try {
        const newItem = new Carousel({ image, caption, link });
        await newItem.save();
        res.status(201).json({ message: 'Carousel item added successfully', item: newItem });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add carousel item', error });
    }
};
