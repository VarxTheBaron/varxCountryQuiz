export type Question = {
  id: number
  question: string
  answers: string[]
  correctAnswer: number // Index i answers, räknat från 0.
}

// Gruppera frågor efter landets id. Fråge-id:n ska vara unika i hela API:t.
export const questionsByCountry: Record<string, Question[]> = {
  sweden: [{
      id: 1,
      question: 'Vad heter Sveriges huvudstad?',
      answers: ['Stockholm', 'Göteborg', 'Malmö', 'Uppsala'],
      correctAnswer: 0,
    }],
  norway: [{
      id: 2,
      question: 'Vad heter Norges huvudstad?',
      answers: ['Bergen', 'Oslo', 'Trondheim', 'Stavanger'],
      correctAnswer: 1,
    }],
  denmark: [{
      id: 3,
      question: 'Vad heter Danmarks huvudstad?',
      answers: ['Odense', 'Århus', 'Köpenhamn', 'Ålborg'],
      correctAnswer: 2,
    }],
  finland: [{
      id: 4,
      question: 'Vad heter Finlands huvudstad?',
      answers: ['Åbo', 'Tammerfors', 'Uleåborg', 'Helsingfors'],
      correctAnswer: 3,
    }],
  iceland: [{
      id: 5,
      question: 'Vad heter Islands huvudstad?',
      answers: ['Reykjavík', 'Oslo', 'Helsingfors', 'Tórshavn'],
      correctAnswer: 0,
    }],
}

export const questions: Question[] = Object.values(questionsByCountry).flat()
