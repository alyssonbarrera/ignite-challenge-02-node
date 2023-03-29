import { create } from './create.'
import { update } from './update'
import { deleteMeal } from './delete'
import { findById } from './find-by-id'
import { FastifyInstance } from 'fastify'
import { findByUserId } from './find-by-user-id'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { getMetrics } from './get-metrics'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/meals', create)
  app.put('/meals/:id', update)
  app.get('/meals/:id', findById)
  app.get('/meals', findByUserId)
  app.get('/meals/metrics', getMetrics)
  app.delete('/meals/:id', deleteMeal)
}
