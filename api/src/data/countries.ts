import { questionsByCountry } from './questions.js'
import type { Question } from './questions.js'

export type Country = {
  id: string
  name: string
  regionId: string
  difficulty: 1 | 2 | 3
  flag: string
  questions: Question[]
}

export const countries: Country[] = [
  {
    id: 'sweden', name: 'Sverige', regionId: 'norden', difficulty: 1, flag: '🇸🇪',
    questions: questionsByCountry.sweden,
  },
  {
    id: 'norway', name: 'Norge', regionId: 'norden', difficulty: 2, flag: '🇳🇴',
    questions: questionsByCountry.norway,
  },
  {
    id: 'denmark', name: 'Danmark', regionId: 'norden', difficulty: 1, flag: '🇩🇰',
    questions: questionsByCountry.denmark,
  },
  {
    id: 'finland', name: 'Finland', regionId: 'norden', difficulty: 2, flag: '🇫🇮',
    questions: questionsByCountry.finland,
  },
  {
    id: 'iceland', name: 'Island', regionId: 'norden', difficulty: 3, flag: '🇮🇸',
    questions: questionsByCountry.iceland,
  },
]
