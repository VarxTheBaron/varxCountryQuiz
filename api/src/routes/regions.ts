import { Hono } from 'hono'
import { regions as regionData, countries } from '../data.js'

export const regions = new Hono()

regions.get('/', (c) => c.json(regionData))

regions.get('/:id', (c) => {
  const region = regionData.find((region) => region.id === c.req.param('id'))

  if (!region) {
    return c.json({ message: 'Regionen finns inte' }, 404)
  }

  return c.json({
    ...region,
    countries: countries.filter((country) => country.regionId === region.id),
  })
})
