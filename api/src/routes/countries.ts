import { Hono } from 'hono'
import { countries as countryData } from '../data/countries.js'

export const countries = new Hono()

countries.get('/', (c) => c.json(countryData))

countries.get('/:id', (c) => {
  const country = countryData.find((country) => country.id === c.req.param('id'))

  if (!country) {
    return c.json({ message: 'Landet finns inte' }, 404)
  }

  return c.json(country)
})

countries.get('/:id/questions', (c) => {
  const country = countryData.find((country) => country.id === c.req.param('id'))

  if (!country) {
    return c.json({ message: 'Landet finns inte' }, 404)
  }

  return c.json(country.questions)
})
