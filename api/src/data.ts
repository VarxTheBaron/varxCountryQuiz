// Lägg till fler regioner och länder här. Frågornas id ska vara unika i hela API:t.
export type Region = {
  id: string
  name: string
  requiredCountries: number
  countries: string[]
}

export type Question = {
  id: number
  question: string
  answers: string[]
  correctAnswer: number // Index i answers, räknat från 0.
}

export type Country = {
  id: string
  name: string
  regionId: string
  difficulty: 1 | 2 | 3
  flag: string
  questions: Question[]
}

export const regions: Region[] = [
  {
    id: 'norden',
    name: 'Norden',
    requiredCountries: 4,
    countries: ['sweden', 'norway', 'denmark', 'finland', 'iceland'],
  },
]

export const countries: Country[] = [
  {
    id: 'sweden', name: 'Sverige', regionId: 'norden', difficulty: 1, flag: '🇸🇪',
    questions: [{
      id: 1,
      question: 'Vad heter Sveriges huvudstad?',
      answers: ['Stockholm', 'Göteborg', 'Malmö', 'Uppsala'],
      correctAnswer: 0,
    }],
  },
  {
    id: 'norway', name: 'Norge', regionId: 'norden', difficulty: 2, flag: '🇳🇴',
    questions: [{
      id: 2,
      question: 'Vad heter Norges huvudstad?',
      answers: ['Bergen', 'Oslo', 'Trondheim', 'Stavanger'],
      correctAnswer: 1,
    }],
  },
  {
    id: 'denmark', name: 'Danmark', regionId: 'norden', difficulty: 1, flag: '🇩🇰',
    questions: [{
      id: 3,
      question: 'Vad heter Danmarks huvudstad?',
      answers: ['Odense', 'Århus', 'Köpenhamn', 'Ålborg'],
      correctAnswer: 2,
    }],
  },
  {
    id: 'finland', name: 'Finland', regionId: 'norden', difficulty: 2, flag: '🇫🇮',
    questions: [{
      id: 4,
      question: 'Vad heter Finlands huvudstad?',
      answers: ['Åbo', 'Tammerfors', 'Uleåborg', 'Helsingfors'],
      correctAnswer: 3,
    }],
  },
  {
    id: 'iceland', name: 'Island', regionId: 'norden', difficulty: 3, flag: '🇮🇸',
    questions: [{
      id: 5,
      question: 'Vad heter Islands huvudstad?',
      answers: ['Reykjavík', 'Oslo', 'Helsingfors', 'Tórshavn'],
      correctAnswer: 0,
    }],
  },
]

// Samma frågor används av /questions och ländernas endpoints.
export const questions: Question[] = countries.flatMap((country) => country.questions)
