import express from 'express';
import { getFlashcardProgress, updateFlashcardProgress } from '../controllers/flashcardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All flashcard routes require authentication
router.use(protect);

router.get('/progress', getFlashcardProgress);
router.post('/progress', updateFlashcardProgress);

export default router;