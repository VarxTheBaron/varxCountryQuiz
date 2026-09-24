import { Hono } from 'hono'
import { questions as questionData } from '../data.js'

export const questions = new Hono()

questions.get('/', (c) => c.json(questionData))

questions.get('/:id', (c) => {
  const question = questionData.find((question) => String(question.id) === c.req.param('id'))

  if (!question) {
    return c.json({ message: 'Frågan finns inte' }, 404)
  }

  return c.json(question)
})
