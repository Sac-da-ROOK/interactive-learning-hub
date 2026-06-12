export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctIndex: number;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  description: string;
  xpReward: number;
  questions: Question[];
}

export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-core',
    title: 'React Core Architecture Evaluation',
    category: 'React',
    description: 'Test your understanding of React fiber synchronization mechanisms and reconciliation.',
    xpReward: 50,
    questions: [
      {
        id: 'q-1',
        questionText: 'Which lifecycle sequence describes React reconciliation matches?',
        options: [
          'Render phase evaluates changes, Commit phase updates the DOM node tree.',
          'Commit phase runs side effects, Render phase builds local server state.',
          'State variations flush directly to the screen immediately.'
        ],
        correctIndex: 0
      },
      {
        id: 'q-2',
        questionText: 'What is the purpose of the key prop during array rendering?',
        options: [
          'To generate unique ID strings across server clusters.',
          'To help React identify which items have changed, been added, or been removed.',
          'To encrypt user interaction telemetry logs.'
        ],
        correctIndex: 1
      }
    ]
  }
];