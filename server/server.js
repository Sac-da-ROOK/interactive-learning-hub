import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'; // <-- Import the new user progress routes

// Load environmental variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Setup Global Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API Route Declarations ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // <-- Mount user progress routes here

// Server API Base Health-Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    message: 'Backend server is running successfully!',
    timestamp: new Date()
  });
});

// Start listening for client network requests
app.listen(PORT, () => {
  console.log(`🚀 Server successfully spinning up in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`Listening on network port: http://localhost:${PORT}`);
});