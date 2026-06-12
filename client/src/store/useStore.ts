import { create } from 'zustand';

// --- Type Defs for Gamification System ---
export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'quiz' | 'flashcard' | 'streak' | 'special';
  tier: 'bronze' | 'silver' | 'gold';
  unlocked: boolean;
  unlockedAt?: string;
  icon: string;
}

export interface LeaderboardUser {
  id: string;
  username: string;
  xp: number;
  level: number;
  isCurrentUser?: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
}

interface UserState {
  // Authentication & Session State (Restored)
  user: UserProfile | null;
  error: string | null;
  clearError: () => void;
  login: (credentials: { email: string; fontPassword?: string }) => Promise<boolean>;
  logout: () => void;

  // Core Statistics & Lesson Completion Engine (Restored)
  xp: number;
  level: number;
  lessonsFinished: number;
  quizAccuracySum: number;
  totalQuizzesAttempted: number;
  loading: boolean;
  completeLesson: (lessonId: string) => Promise<void>;

  // Feature 1: Streaks & Quests
  streakCount: number;
  streakFreezeActive: boolean;
  currencyCoins: number;
  dailyQuests: { id: string; text: string; completed: boolean; target: number; current: number; xpReward: number }[];

  // Feature 2: Achievement Matrix
  achievements: Achievement[];

  // Feature 3: Global Leaderboards
  leaderboard: LeaderboardUser[];

  // Core Orchestration Methods
  submitQuizAttempt: (quizId: string, score: number, totalQuestions: number) => Promise<void>;
  incrementFlashcardProgress: () => void;
  buyStreakFreeze: () => boolean;
  checkAchievements: () => void;
  refreshDailyQuests: () => void;
  simulateCompetitorGrowth: () => void;
}

const getXPNeededForLevel = (lvl: number) => lvl * 100;

export const useUserStore = create<UserState>((set, get) => ({
  // Authentication Init State (Restored)
  user: { id: 'curr-user', email: 'test@example.com', username: 'Student Explorer' },
  error: null,
  clearError: () => set({ error: null }),
  login: async () => {
    set({ user: { id: 'curr-user', email: 'test@example.com', username: 'Student Explorer' } });
    return true;
  },
  logout: () => set({ user: null }),

  // Core Learning Progress Init State (Restored)
  xp: 0,
  level: 1,
  lessonsFinished: 0,
  quizAccuracySum: 0,
  totalQuizzesAttempted: 0,
  loading: false,
  
  completeLesson: async (lessonId) => {
    set({ loading: true });
    await new Promise((resolve) => setTimeout(resolve, 400));
    const state = get();
    let currentXP = state.xp + 50; // 50 XP awarded per completed lesson unit
    let currentLevel = state.level;

    while (currentXP >= getXPNeededForLevel(currentLevel)) {
      currentXP -= getXPNeededForLevel(currentLevel);
      currentLevel += 1;
    }

    set({
      xp: currentXP,
      level: currentLevel,
      lessonsFinished: state.lessonsFinished + 1,
      loading: false
    });
  },

  // Feature 1 Initial State
  streakCount: 3, 
  streakFreezeActive: false,
  currencyCoins: 120,
  dailyQuests: [
    { id: 'dq-1', text: 'Push Past the Limits: Flashcard Master', completed: false, target: 5, current: 0, xpReward: 25 },
    { id: 'dq-2', text: 'Flawless Victory: Ace any Quiz Metric', completed: false, target: 1, current: 0, xpReward: 35 },
    { id: 'dq-3', text: 'Mental Stamina: Tackle a new Module', completed: false, target: 1, current: 0, xpReward: 20 }
  ],

  // Feature 2 Initial State
  achievements: [
    { id: 'ach-1', title: 'Callback Commander', description: 'Complete your first ever quiz assessment.', category: 'quiz', tier: 'bronze', unlocked: false, icon: 'BrainCircuit' },
    { id: 'ach-2', title: 'Syntax Sorcerer', description: 'Achieve a flawless 100% score on any quiz module.', category: 'quiz', tier: 'silver', unlocked: false, icon: 'Award' },
    { id: 'ach-3', title: 'Unstoppable Momentum', description: 'Reach a streak milestone of 3 consecutive days.', category: 'streak', tier: 'bronze', unlocked: false, icon: 'Flame' },
    { id: 'ach-4', title: 'Hoarder of Knowledge', description: 'Review a total of 15 active recall flashcards.', category: 'flashcard', tier: 'gold', unlocked: false, icon: 'Layers' }
  ],

  // Feature 3 Initial State
  leaderboard: [
    { id: 'bot-1', username: 'SyntaxSorcerer_99', xp: 450, level: 4 },
    { id: 'bot-2', username: 'Async_Ascendant', xp: 280, level: 2 },
    { id: 'curr-user', username: 'Student Explorer', xp: 0, level: 1, isCurrentUser: true },
    { id: 'bot-3', username: 'Callback_Kid', xp: 90, level: 1 },
    { id: 'bot-4', username: 'V8_Engine_Ghost', xp: 40, level: 1 }
  ],

  buyStreakFreeze: () => {
    const { currencyCoins, streakFreezeActive } = get();
    if (currencyCoins >= 100 && !streakFreezeActive) {
      set({ currencyCoins: currencyCoins - 100, streakFreezeActive: true });
      return true;
    }
    return false;
  },

  refreshDailyQuests: () => {
    set({
      dailyQuests: [
        { id: 'dq-1', text: 'Review 5 Flashcards', completed: false, target: 5, current: 0, xpReward: 25 },
        { id: 'dq-2', text: 'Score 100% on a Quiz', completed: false, target: 1, current: 0, xpReward: 35 },
        { id: 'dq-3', text: 'Earn 50 XP in one session', completed: false, target: 50, current: 0, xpReward: 20 }
      ]
    });
  },

  checkAchievements: () => {
    const state = get();
    let updated = false;
    
    const nextAchievements = state.achievements.map(ach => {
      if (ach.unlocked) return ach;
      let shouldUnlock = false;
      if (ach.id === 'ach-1' && state.totalQuizzesAttempted >= 1) shouldUnlock = true;
      if (ach.id === 'ach-3' && state.streakCount >= 3) shouldUnlock = true;
      
      if (shouldUnlock) {
        updated = true;
        return { ...ach, unlocked: true, unlockedAt: new Date().toLocaleTimeString() };
      }
      return ach;
    });

    if (updated) set({ achievements: nextAchievements });
  },

  simulateCompetitorGrowth: () => {
    const { leaderboard } = get();
    const updatedLeaderboard = leaderboard.map(user => {
      if (user.isCurrentUser) return user;
      const nextXP = user.xp + Math.floor(Math.random() * 15);
      return { ...user, xp: nextXP, level: Math.floor(nextXP / 100) + 1 };
    }).sort((a, b) => b.xp - a.xp);
    
    set({ leaderboard: updatedLeaderboard });
  },

  submitQuizAttempt: async (quizId, score, totalQuestions) => {
    set({ loading: true });
    await new Promise((resolve) => setTimeout(resolve, 800));

    const state = get();
    const immediateAccuracy = (score / totalQuestions) * 100;
    const generatedXP = score * 25; 
    const coinsEarned = score * 5;

    let currentXP = state.xp + generatedXP;
    let currentLevel = state.level;

    while (currentXP >= getXPNeededForLevel(currentLevel)) {
      currentXP -= getXPNeededForLevel(currentLevel);
      currentLevel += 1;
    }

    const updatedQuests = state.dailyQuests.map(q => {
      if (q.id === 'dq-2' && immediateAccuracy === 100) return { ...q, current: 1, completed: true };
      return q;
    });

    const freshLeaderboard = state.leaderboard.map(user => {
      if (user.isCurrentUser) return { ...user, xp: user.xp + generatedXP, level: currentLevel };
      return user;
    }).sort((a, b) => b.xp - a.xp);

    set({
      xp: currentXP,
      level: currentLevel,
      currencyCoins: state.currencyCoins + coinsEarned,
      totalQuizzesAttempted: state.totalQuizzesAttempted + 1,
      quizAccuracySum: state.quizAccuracySum + immediateAccuracy,
      dailyQuests: updatedQuests,
      leaderboard: freshLeaderboard,
      loading: false
    });

    get().checkAchievements();
    get().simulateCompetitorGrowth();
  },

  incrementFlashcardProgress: () => {
    const state = get();
    const updatedQuests = state.dailyQuests.map(q => {
      if (q.id === 'dq-1' && q.current < q.target) {
        const nextVal = q.current + 1;
        return { ...q, current: nextVal, completed: nextVal === q.target };
      }
      return q;
    });

    set({ dailyQuests: updatedQuests });
    get().checkAchievements();
  }
}));