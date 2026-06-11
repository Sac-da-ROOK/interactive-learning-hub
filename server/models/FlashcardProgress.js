import mongoose from 'mongoose';

const flashcardProgressSchema = new mongoose.Schema({
  // Link to the specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // The ID of the JSON flashcard deck (e.g., 'css-flexbox')
  deckId: {
    type: String,
    required: true
  },
  cardsMastered: {
    type: Number,
    default: 0
  },
  totalCards: {
    type: Number,
    required: true
  },
  lastReviewed: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure a user has only one progress record per deck
flashcardProgressSchema.index({ user: 1, deckId: 1 }, { unique: true });

const FlashcardProgress = mongoose.model('FlashcardProgress', flashcardProgressSchema);
export default FlashcardProgress;