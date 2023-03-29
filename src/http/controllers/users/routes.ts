import { find } from './find'
import { create } from './create'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', create)
  app.get('/users/:id', { onRequest: [verifyJWT] }, find)

  app.post('/session', authenticate)
}
