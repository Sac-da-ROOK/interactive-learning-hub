import QuizResult from '../models/QuizResult.js';
import User from '../models/User.js';

// @desc    Get user's previous quiz results
// @route   GET /api/quizzes/history
export const getQuizHistory = async (req, res) => {
  try {
    const history = await QuizResult.find({ user: req.user._id }).sort({ completedAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving quiz history', error: error.message });
  }
};

// @desc    Submit quiz score, award XP, update user streak
// @route   POST /api/quizzes/submit
export const submitQuizScore = async (req, res) => {
  const { quizId, score, totalQuestions } = req.body;

  if (score === undefined || !totalQuestions || !quizId) {
    return res.status(400).json({ message: 'Please provide quizId, score, and totalQuestions' });
  }

  try {
    const percentage = Math.round((score / totalQuestions) * 100);

    const quizResult = await QuizResult.create({
      user: req.user._id,
      quizId,
      score,
      totalQuestions,
      percentage
    });

    // Gamification Logic: Calculate rewards based on score
    // 10 XP per correct answer, with a bonus 50 XP if they aced it (100%)
    let xpGained = score * 10;
    if (percentage === 100) {
      xpGained += 50; 
    }

    const user = await User.findById(req.user._id);
    let streakUpdated = false;

    if (user) {
      user.xp += xpGained;

      // Calculate streak: If last activity was yesterday, increment streak.
      // If it's a new day, update streak.
      const today = new Date().setHours(0, 0, 0, 0);
      const lastActiveDay = new Date(user.lastActive).setHours(0, 0, 0, 0);
      const oneDayInMs = 24 * 60 * 60 * 1000;

      if (today - lastActiveDay === oneDayInMs) {
        user.streak += 1;
        streakUpdated = true;
      } else if (today - lastActiveDay > oneDayInMs) {
        user.streak = 1; // Reset streak if they missed a day
        streakUpdated = true;
      } else if (user.streak === 0) {
        user.streak = 1; // Initial entry
        streakUpdated = true;
      }

      user.lastActive = new Date();
      await user.save();
    }

    res.status(201).json({
      message: 'Quiz score submitted successfully!',
      result: quizResult,
      xpAwarded: xpGained,
      streak: user ? user.streak : 0,
      streakUpdated
    });
  } catch (error) {
    res.status(500).json({ message: 'Error saving quiz score', error: error.message });
  }
};