import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
  // Link to the specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // The ID of the JSON quiz file (e.g., 'javascript-quiz')
  quizId: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  // Optional: Store percentage for easy querying later
  percentage: {
    type: Number,
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);
export default QuizResult;