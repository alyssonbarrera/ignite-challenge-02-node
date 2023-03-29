import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFindMealByUserIdUseCase } from '@/use-cases/factories/make-find-meal-by-user-id-use-case'

export async function findByUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const id = request.user?.sign.sub

  const findMealByUserIdUseCase = makeFindMealByUserIdUseCase()

  const meals = await findMealByUserIdUseCase.execute(id)

  reply.status(200).send({
    meals,
  })
}
