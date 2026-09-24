import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { regions } from './routes/regions.js'
import { countries } from './routes/countries.js'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ message: 'Country Challenge API' })
})

app.route('/regions', regions)
app.route('/countries', countries)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
