const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question_number: { type: Number, required: true },
    question: { type: String, required: true },
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    correctAnswer: String,
    description: String,
});

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    count: { type: Number, default: 0 },
    image_url: String,
    categories: {
        hisar: [questionSchema],
        ambala: [questionSchema],
    },
});

module.exports = mongoose.model('Subject', subjectSchema);
