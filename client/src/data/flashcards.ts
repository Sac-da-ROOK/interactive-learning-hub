export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  category: string;
  cards: Flashcard[];
}

export const mockDecks: FlashcardDeck[] = [
  {
    id: 'deck-1',
    title: 'JavaScript Closures & Scope',
    description: 'Master lexical scoping, execution contexts, and closures.',
    category: 'JavaScript',
    cards: [
      { id: 'c1', question: 'What is a closure?', answer: 'A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment).' },
      { id: 'c2', question: 'What is lexical scoping?', answer: 'Lexical scoping means that variable access is determined by the position of the variables within the nested function source code.' }
    ]
  }
];

// Fallback flat array helper to satisfy the Admin panel's imports!
export const mockFlashcards = mockDecks[0].cards;