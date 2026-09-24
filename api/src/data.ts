// Lägg till fler regioner, länder och frågor i listorna nedan.
export type Region = {
  id: string
  name: string
}

export type Country = {
  id: string
  name: string
  regionId: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export type Question = {
  id: string
  countryId: string
  text: string
  options: string[]
  correctAnswer: string
}

export const regions: Region[] = [
  { id: 'nordics', name: 'Norden' },
]

export const countries: Country[] = [
  { id: 'sweden', name: 'Sverige', regionId: 'nordics', difficulty: 'easy' },
  { id: 'norway', name: 'Norge', regionId: 'nordics', difficulty: 'medium' },
  { id: 'iceland', name: 'Island', regionId: 'nordics', difficulty: 'hard' },
]

export const questions: Question[] = [
  {
    id: 'sweden-1',
    countryId: 'sweden',
    text: 'Vad heter Sveriges huvudstad?',
    options: ['Stockholm', 'Göteborg', 'Malmö'],
    correctAnswer: 'Stockholm',
  },
  {
    id: 'norway-1',
    countryId: 'norway',
    text: 'Vad heter Norges huvudstad?',
    options: ['Bergen', 'Oslo', 'Trondheim'],
    correctAnswer: 'Oslo',
  },
  {
    id: 'iceland-1',
    countryId: 'iceland',
    text: 'Vad heter Islands huvudstad?',
    options: ['Akureyri', 'Keflavík', 'Reykjavík'],
    correctAnswer: 'Reykjavík',
  },
]
