import User from '../models/User.js';

// @desc    Mark a lesson as completed and award XP
// @route   POST /api/users/complete-lesson
// @access  Private
export const completeLesson = async (req, res) => {
  try {
    const { lessonId } = req.body;
    const userId = req.user._id; // Extracted safely from the 'protect' middleware

    if (!lessonId) {
      return res.status(400).json({ message: 'Lesson ID is required' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the lesson has already been completed to prevent exploit farming
    if (user.completedLessons.includes(lessonId)) {
      return res.status(400).json({ message: 'Lesson already completed' });
    }

    // Append lesson ID and grant +25 XP
    user.completedLessons.push(lessonId);
    user.xp += 25;

    await user.save();

    res.status(200).json({
      message: 'Lesson marked as completed! +25 XP earned.',
      xp: user.xp,
      level: user.level,
      completedLessons: user.completedLessons
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error tracking lesson progress', error: error.message });
  }
};

// @desc    Record a quiz attempt and award milestone XP
// @route   POST /api/users/submit-quiz
// @access  Private
export const submitQuizAttempt = async (req, res) => {
  try {
    const { quizId, score, totalQuestions } = req.body;
    const userId = req.user._id;

    if (!quizId || score === undefined || !totalQuestions) {
      return res.status(400).json({ message: 'Please provide all quiz result parameters' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Record the attempt history block
    user.quizAttempts.push({
      quizId,
      score,
      totalQuestions,
      completedAt: new Date()
    });

    // Base engagement reward is +50 XP for finishing a knowledge check quiz
    user.xp += 50;

    await user.save();

    res.status(200).json({
      message: 'Quiz attempt logged! +50 XP earned.',
      xp: user.xp,
      level: user.level,
      quizAttempts: user.quizAttempts
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error saving quiz attempt metrics', error: error.message });
  }
};