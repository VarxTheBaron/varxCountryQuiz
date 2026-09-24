export type Region = {
  id: string
  name: string
  // null betyder att regionen är upplåst från början.
  requiredCountries: { regionId: string; count: number } | null
  countries: string[]
}

export const regions: Region[] = [
  {
    id: 'norden',
    name: 'Norden',
    requiredCountries: null,
    countries: ['sweden', 'norway', 'denmark', 'finland', 'iceland'],
  },
  {
    id: 'central-europe',
    name: 'Centraleuropa',
    requiredCountries: { regionId: 'norden', count: 4 },
    countries: ['germany', 'austria'],
  },
  {
    id: 'western-europe',
    name: 'Västeuropa',
    requiredCountries: { regionId: 'central-europe', count: 2 },
    countries: ['france', 'belgium'],
  },
  {
    id: 'eastern-europe',
    name: 'Östeuropa',
    requiredCountries: { regionId: 'western-europe', count: 2 },
    countries: ['romania', 'ukraine'],
  },
  {
    id: 'north-america',
    name: 'Nordamerika',
    requiredCountries: { regionId: 'eastern-europe', count: 2 },
    countries: ['canada', 'usa'],
  },
]
