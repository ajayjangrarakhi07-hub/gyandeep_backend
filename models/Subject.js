const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question_number: { type: Number, required: true },
    question: { type: String, required: true },
    option1: { type: String, required: true },
    option2: { type: String, required: true },
    option3: { type: String, required: true },
    option4: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    description: { type: String, required: true },
});

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    count: { type: Number, default: 0 },
    image_url: { type: String },
    categories: {
        type: Map,
        of: [questionSchema], // Allows dynamic keys with an array of questions as values
        default: undefined, // Ensure no default value for categories
    },
});

module.exports = mongoose.model('Subject', subjectSchema);
