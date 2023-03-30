import { FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from '@/use-cases/errors/AppError'
import { makeFindMealByUserIdUseCase } from '@/use-cases/factories/make-find-meal-by-user-id-use-case'

export async function findByUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const id = request.user?.sign.sub

  try {
    const findMealByUserIdUseCase = makeFindMealByUserIdUseCase()

    const meals = await findMealByUserIdUseCase.execute(id)

    return reply.status(200).send({
      meals,
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
