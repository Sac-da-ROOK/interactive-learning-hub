import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  xp: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  completedLessons: [{
    type: String // Stores lesson IDs (e.g., 'lesson-1')
  }],
  quizAttempts: [{
    quizId: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Calculate user level dynamically based on XP milestones before saving
userSchema.pre('save', function(next) {
  // Simple algorithm: Every 100 XP grants a level upgrade
  this.level = Math.floor(this.xp / 100) + 1;
  next();
});

const User = mongoose.model('User', userSchema);
export default User;