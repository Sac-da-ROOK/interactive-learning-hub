import FlashcardProgress from '../models/FlashcardProgress.js';
import User from '../models/User.js';

// @desc    Get flashcard progression stats for logged-in user
// @route   GET /api/flashcards/progress
export const getFlashcardProgress = async (req, res) => {
  try {
    const progress = await FlashcardProgress.find({ user: req.user._id });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving flashcard stats', error: error.message });
  }
};

// @desc    Update progress/mastery metrics for a flashcard deck
// @route   POST /api/flashcards/progress
export const updateFlashcardProgress = async (req, res) => {
  const { deckId, cardsMastered, totalCards } = req.body;

  if (!deckId || cardsMastered === undefined || !totalCards) {
    return res.status(400).json({ message: 'DeckId, cardsMastered, and totalCards are required' });
  }

  try {
    let progress = await FlashcardProgress.findOne({ user: req.user._id, deckId });

    if (!progress) {
      progress = new FlashcardProgress({
        user: req.user._id,
        deckId,
        cardsMastered,
        totalCards,
        lastReviewed: new Date()
      });
    } else {
      // Keep record of highest mastery completed
      if (cardsMastered > progress.cardsMastered) {
        progress.cardsMastered = cardsMastered;
      }
      progress.totalCards = totalCards;
      progress.lastReviewed = new Date();
    }

    await progress.save();

    // Reward 5 XP for every card mastered during study
    const xpReward = cardsMastered * 5;
    const user = await User.findById(req.user._id);
    if (user && xpReward > 0) {
      user.xp += xpReward;
      user.lastActive = new Date();
      await user.save();
    }

    res.json({
      message: 'Flashcard progress updated!',
      progress,
      xpAwarded: xpReward,
      totalXp: user ? user.xp : 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating flashcard progress', error: error.message });
  }
};