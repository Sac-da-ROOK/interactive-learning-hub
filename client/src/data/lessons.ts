export interface LessonStep {
  id: string;
  title: string;
  content: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  steps: LessonStep[];
}

export const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Understanding Asynchronous JavaScript',
    description: 'Deep dive into Event Loops, Callbacks, Promises, and Async/Await.',
    difficulty: 'Intermediate',
    category: 'JavaScript',
    steps: [
      {
        id: 'step-1',
        title: 'The Call Stack & Event Loop',
        content: 'JavaScript is single-threaded, meaning it executes one script line at a time. The Call Stack keeps track of functions currently executing.'
      },
      {
        id: 'step-2',
        title: 'The Evolution of Promises',
        content: 'Promises represent the eventual completion (or failure) of an asynchronous operation.'
      }
    ]
  }
];