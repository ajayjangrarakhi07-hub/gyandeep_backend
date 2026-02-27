const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const quizResultsRoute = require('./routes/quizResults');
const subjectsRoutes  = require('./routes/subjecstRoutes');
const reviewRoutes = require('./routes/reviewRoutes');   
const postRoutes = require('./routes/postRoutes');  
const getSubjectByNameRoute = require('./routes/subjecstRoutes'); 
const getSubjectsSummary = require('./routes/subjecstRoutes'); 


// Import routes
const discussionRoutes = require('./routes/discussionRoutes');

// Import routes
const fullMockTestRoutes = require('./routes/fullMockTestRoutes');
 
const paidUserRoutes = require('./routes/paidUserRoutes');


const statusRoutes = require("./routes/statusRoutes");


const carouselRoutes = require('./routes/carouselRoutes');

const testSeriesRoutes = require('./routes/testSeriesRoutes');



const paymentRoutes = require("./routes/paymentRoutes");




dotenv.config();

const app = express();

// Middleware
// app.use(cors());
app.use(cors({
    origin: '*', // Use '*' for debugging; specify exact origins in production
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', quizResultsRoute);

app.use('/api', subjectsRoutes);

app.use('/api', reviewRoutes);  // Use review routes

app.use('/api', postRoutes); // Use post routes

app.use('/api', getSubjectByNameRoute); // Use new route

app.use('/api', getSubjectsSummary); // Use new route

app.use('/api', discussionRoutes);

app.use('/api', fullMockTestRoutes);

app.use('/api', paidUserRoutes);

// whole app is free(true) or paid(false) 
app.use("/api", statusRoutes);


app.use('/api', testSeriesRoutes);


 
app.use('/api', carouselRoutes); // Make sure the router is added to the correct path


app.use("/api", paymentRoutes);








app.post('/api/submit-data', async (req, res) => {
    try {
        console.log('Received data:', JSON.stringify(req.body, null, 2));

        // Validate data (optional)
        if (!req.body.name || !req.body.categories) {
            return res.status(400).json({ message: 'Invalid data format' });
        }

        // Save data to database
        const newSubject = new Subject(req.body);
        const savedSubject = await newSubject.save();

        res.status(201).json({ message: 'Data submitted successfully', savedSubject });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});


// Express route for updating a lesson with new categories
app.put('/api/update-lesson/:name', async (req, res) => {
    const subjectName = req.params.name;
    const { categories } = req.body;

    try {
        const updatedSubject = await Subject.findOneAndUpdate(
            { name: subjectName },
            { $set: { categories } },
            { new: true }
        );
        res.json(updatedSubject);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update lesson categories', error });
    }
});





// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
