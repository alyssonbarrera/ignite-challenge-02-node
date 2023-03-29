import { z } from 'zod'
import { AppError } from '@/use-cases/errors/AppError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateUserUseCase } from '@/use-cases/factories/make-create-user-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const { name, email, password } = createBodySchema.parse(request.body)

  try {
    const createUserUseCase = makeCreateUserUseCase()
    await createUserUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ error: error.message })
    }
    throw error
  }

  reply.status(201).send()
}
