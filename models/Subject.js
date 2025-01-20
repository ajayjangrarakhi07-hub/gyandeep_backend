const mongoose = require('mongoose');


const pdfSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
}); 

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
    id: { type: Number, default: 0 },
    name: { type: String, required: true, index: true },  // index is faster the querry retrevieing data 
    count: { type: Number, default: 0 },
    image_url: { type: String },
    categories: {
        type: Map,
        of: [questionSchema], // Allows dynamic keys with an array of questions as values
        default: undefined, // Ensure no default value for categories
    },
    pdfs: [pdfSchema], // Array of PDFs with schema validation
});

module.exports = mongoose.model('Subject', subjectSchema);
