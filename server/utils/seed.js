import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Load environmental configurations
dotenv.config();

const seedDatabase = async () => {
  try {
    // 1. Establish database connection
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/interactive-learning-hub';
    console.log('🍃 Connecting to MongoDB for seeding...');
    await mongoose.connect(mongoUri);

    // 2. Clear out any existing user records to prevent duplicates
    console.log('🗑️  Clearing existing User collections...');
    await User.deleteMany({});

    // 3. Hash a test password securely
    console.log('🔑 Hashing credential blocks...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // 4. Insert dummy test profile dataset
    console.log('👤 Injecting test student profile documentation...');
    await User.create({
      username: 'codewizard',
      email: 'test@example.com',
      password: hashedPassword,
      xp: 150, // Starts at Level 2 out of the box (150 XP / 100 = 1 + 1 = Level 2)
      completedLessons: ['lesson-1'],
      quizAttempts: [
        {
          quizId: 'q-1',
          score: 2,
          totalQuestions: 2,
          completedAt: new Date()
        }
      ]
    });

    console.log('✨ Database populated with test user successfully!');
    console.log('\n=========================================');
    console.log('  Login Email:    test@example.com');
    console.log('  Login Password: password123');
    console.log('=========================================\n');

    // Safe exit sequence closure
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding failure error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();