import LessonProgress from '../models/LessonProgress.js';
import User from '../models/User.js';

// @desc    Get all lesson progress records for the logged-in user
// @route   GET /api/lessons/progress
export const getLessonProgress = async (req, res) => {
  try {
    const progress = await LessonProgress.find({ user: req.user._id });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving lesson progress', error: error.message });
  }
};

// @desc    Mark a lesson as complete & award XP
// @route   POST /api/lessons/complete
export const completeLesson = async (req, res) => {
  const { lessonId } = req.body;

  if (!lessonId) {
    return res.status(400).json({ message: 'Lesson ID is required' });
  }

  try {
    // Find existing progress or create new
    let progress = await LessonProgress.findOne({ user: req.user._id, lessonId });

    if (progress && progress.isCompleted) {
      return res.status(200).json({ message: 'Lesson already marked as complete', progress });
    }

    if (!progress) {
      progress = new LessonProgress({
        user: req.user._id,
        lessonId,
        isCompleted: true,
        lastAccessed: new Date()
      });
    } else {
      progress.isCompleted = true;
      progress.lastAccessed = new Date();
    }

    await progress.save();

    // Reward XP to the user (e.g., 50 XP for completing a lesson)
    const xpReward = 50;
    const user = await User.findById(req.user._id);
    if (user) {
      user.xp += xpReward;
      user.lastActive = new Date();
      await user.save();
    }

    res.status(200).json({
      message: `Lesson completed! Gained ${xpReward} XP.`,
      progress,
      xpAwarded: xpReward,
      totalXp: user ? user.xp : 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating lesson completion', error: error.message });
  }
};