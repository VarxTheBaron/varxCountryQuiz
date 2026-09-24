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
    id: 'germany', name: 'Tyskland', regionId: 'central-europe', difficulty: 1, flag: '🇩🇪',
    questions: questionsByCountry.germany,
  },
  {
    id: 'austria', name: 'Österrike', regionId: 'central-europe', difficulty: 2, flag: '🇦🇹',
    questions: questionsByCountry.austria,
  },
  {
    id: 'france', name: 'Frankrike', regionId: 'western-europe', difficulty: 1, flag: '🇫🇷',
    questions: questionsByCountry.france,
  },
  {
    id: 'belgium', name: 'Belgien', regionId: 'western-europe', difficulty: 2, flag: '🇧🇪',
    questions: questionsByCountry.belgium,
  },
  {
    id: 'romania', name: 'Rumänien', regionId: 'eastern-europe', difficulty: 2, flag: '🇷🇴',
    questions: questionsByCountry.romania,
  },
  {
    id: 'ukraine', name: 'Ukraina', regionId: 'eastern-europe', difficulty: 2, flag: '🇺🇦',
    questions: questionsByCountry.ukraine,
  },
  {
    id: 'canada', name: 'Kanada', regionId: 'north-america', difficulty: 2, flag: '🇨🇦',
    questions: questionsByCountry.canada,
  },
  {
    id: 'usa', name: 'USA', regionId: 'north-america', difficulty: 1, flag: '🇺🇸',
    questions: questionsByCountry.usa,
  },
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
