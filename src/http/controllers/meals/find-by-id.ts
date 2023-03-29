import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFindMealByIdUseCase } from '@/use-cases/factories/make-find-meal-by-id-use-case'

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string(),
  })

  const { id } = paramsSchema.parse(request.params)

  const findMealByIdUseCase = makeFindMealByIdUseCase()

  const meal = await findMealByIdUseCase.execute(id)

  reply.status(200).send({
    meal,
  })
}
