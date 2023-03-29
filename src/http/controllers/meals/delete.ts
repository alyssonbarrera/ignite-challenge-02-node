import { z } from 'zod'
import { AppError } from '@/use-cases/errors/AppError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeleteMealUseCase } from '@/use-cases/factories/make-delete-meal-use-case'

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string(),
  })

  const { id } = paramsSchema.parse(request.params)

  try {
    const deleteMealUseCase = makeDeleteMealUseCase()
    await deleteMealUseCase.execute(id)
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ error: error.message })
    }
    throw error
  }

  reply.status(204).send()
}
