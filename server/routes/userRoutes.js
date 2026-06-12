import express from 'express';
import { completeLesson, submitQuizAttempt } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Both routes are protected; requests require a valid 'Bearer <token>' token header
router.post('/complete-lesson', protect, completeLesson);
router.post('/submit-quiz', protect, submitQuizAttempt);

export default router;