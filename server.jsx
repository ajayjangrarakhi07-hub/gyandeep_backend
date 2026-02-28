const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const subjectsRoutes = require('./routes/subjecstRoutes'); // all subject routes combined
const quizResultsRoute = require('./routes/quizResults');
const reviewRoutes = require('./routes/reviewRoutes');
const postRoutes = require('./routes/postRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const fullMockTestRoutes = require('./routes/fullMockTestRoutes');
const paidUserRoutes = require('./routes/paidUserRoutes');
const statusRoutes = require('./routes/statusRoutes');
const carouselRoutes = require('./routes/carouselRoutes');
const testSeriesRoutes = require('./routes/testSeriesRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const Subject = require('./models/Subject'); // ✅ Import your model

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectsRoutes);
app.use("/api/quiz-results", quizResultsRoute);
app.use("/api/reviews", reviewRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/discussions", discussionRoutes);
app.use("/api/full-mock-tests", fullMockTestRoutes);
app.use("/api/paid-users", paidUserRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/carousel", carouselRoutes);
app.use("/api/test-series", testSeriesRoutes);
app.use("/api/payments", paymentRoutes);

// Submit new subject
app.post('/api/submit-data', async (req, res) => {
    try {
        const { name, categories } = req.body;
        if (!name || !categories) return res.status(400).json({ message: 'Invalid data' });

        const newSubject = new Subject({ name, categories });
        const savedSubject = await newSubject.save();
        res.status(201).json({ message: 'Data submitted', savedSubject });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update subject categories
app.put('/api/update-lesson/:name', async (req, res) => {
    try {
        const updatedSubject = await Subject.findOneAndUpdate(
            { name: req.params.name },
            { $set: { categories: req.body.categories } },
            { new: true }
        );
        res.json(updatedSubject);
    } catch (error) {
        res.status(500).json({ message: 'Update failed', error });
    }
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));