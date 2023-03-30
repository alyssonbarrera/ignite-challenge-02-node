import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFindUserByIdUseCase } from '@/use-cases/factories/make-find-user-by-id-use-case'

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const findParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = findParamsSchema.parse(request.params)

  const findUserByIdUseCase = makeFindUserByIdUseCase()

  const { user } = await findUserByIdUseCase.execute(id)

  return reply.status(200).send({
    user: {
      ...user,
      password: undefined,
    },
  })
}
