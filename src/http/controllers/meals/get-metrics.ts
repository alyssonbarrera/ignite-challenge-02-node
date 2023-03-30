import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetMetricsUseCase } from '@/use-cases/factories/make-get-metrics-use-case'

export async function getMetrics(request: FastifyRequest, reply: FastifyReply) {
  const id = request.user?.sign.sub

  const getMetricsUseCase = makeGetMetricsUseCase()

  const metrics = await getMetricsUseCase.execute(id)

  return reply.status(200).send({
    metrics,
  })
}
