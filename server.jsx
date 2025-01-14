const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const quizResultsRoute = require('./routes/quizResults');
const subjectsRoutes = require('./routes/subjecstRoutes');
const reviewRoutes = require('./routes/reviewRoutes');  // Import review routes

const { getAccessToken } = require("./src/services/fcmService");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', quizResultsRoute);

app.use('/api', subjectsRoutes);

app.use('/api', reviewRoutes);  // Use review routes

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


// send Notification
app.post("/send-notification", async (req, res) => {
    try {
        const { token, title, body } = req.body;
        const result = await getAccessToken();
        // You can use the access token here to make any API calls or send notifications
        res.json({ success: true, message: "Notification sent", result });
    } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});





// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
