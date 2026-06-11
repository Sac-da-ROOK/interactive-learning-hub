import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// 1. IMPORT YOUR ROUTES AT THE TOP
import authRoutes from './routes/authRoutes.js';

// Load environment variables from the .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Set up Middleware
app.use(cors()); // Allows your React frontend to communicate with this backend
app.use(express.json()); // Allows the server to accept and parse JSON data in request bodies

// Define the Port and Database URI
const PORT = process.env.PORT || 5000;
// We use a fallback URI for local development if the .env file isn't set up yet
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/learning_hub';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });

// 2. MOUNT YOUR ROUTES HERE
app.use('/api/auth', authRoutes);

// A simple health-check route to test if the server is running
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'success', 
    message: 'Welcome to the Interactive Learning Hub API! Server is up and running.' 
  });
});

// Start the server and listen for requests
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});