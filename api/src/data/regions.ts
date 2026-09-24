export type Region = {
  id: string
  name: string
  requiredCountries: number
  countries: string[]
}

export const regions: Region[] = [
  {
    id: 'norden',
    name: 'Norden',
    requiredCountries: 4,
    countries: ['sweden', 'norway', 'denmark', 'finland', 'iceland'],
  },
]
