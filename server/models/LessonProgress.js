import mongoose from 'mongoose';

const lessonProgressSchema = new mongoose.Schema({
  // Link to the specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // We use a String here because your lessons are currently Markdown files (e.g., 'react-basics')
  lessonId: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure a user can only have one progress record per lesson
lessonProgressSchema.index({ user: 1, lessonId: 1 }, { unique: true });

const LessonProgress = mongoose.model('LessonProgress', lessonProgressSchema);
export default LessonProgress;