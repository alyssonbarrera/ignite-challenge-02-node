import { z } from 'zod'
import { AppError } from '@/use-cases/errors/AppError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateMealUseCase } from '@/use-cases/factories/make-create-meal-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    date: z.string(),
    time: z.string(),
    within_the_diet: z.boolean(),
    user_id: z.string(),
  })

  const data = createBodySchema.parse(request.body)

  try {
    const createMealUseCase = makeCreateMealUseCase()
    await createMealUseCase.execute(data)
    return reply.status(201).send()
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ error: error.message })
    }
    throw error
  }
}
