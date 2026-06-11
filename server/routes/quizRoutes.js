import express from 'express';
import { getQuizHistory, submitQuizScore } from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All quiz routes require authentication
router.use(protect);

router.get('/history', getQuizHistory);
router.post('/submit', submitQuizScore);

export default router;