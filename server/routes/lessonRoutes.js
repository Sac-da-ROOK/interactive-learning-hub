import express from 'express';
import { getLessonProgress, completeLesson } from '../controllers/lessonController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All lesson routes require authentication
router.use(protect);

router.get('/progress', getLessonProgress);
router.post('/complete', completeLesson);

export default router;