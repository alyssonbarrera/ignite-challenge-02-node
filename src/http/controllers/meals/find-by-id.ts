import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFindMealByIdUseCase } from '@/use-cases/factories/make-find-meal-by-id-use-case'
import { AppError } from '@/use-cases/errors/AppError'

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string(),
  })

  const { id } = paramsSchema.parse(request.params)

  try {
    const findMealByIdUseCase = makeFindMealByIdUseCase()

    const meal = await findMealByIdUseCase.execute(id)

    return reply.status(200).send({
      meal,
    })
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        message: error.message,
      })
    }
    throw error
  }
}
