import { z } from 'zod'
import { AppError } from '@/use-cases/errors/AppError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUpdateMealUseCase } from '@/use-cases/factories/make-update-meal-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string(),
  })

  const updateBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    date: z.string().optional(),
    time: z.string().optional(),
    within_the_diet: z.boolean().optional(),
  })

  const { id } = paramsSchema.parse(request.params)
  const data = updateBodySchema.parse(request.body)

  try {
    const updateMealUseCase = makeUpdateMealUseCase()
    await updateMealUseCase.execute(id, data)
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ error: error.message })
    }
    throw error
  }

  reply.status(200).send()
}
