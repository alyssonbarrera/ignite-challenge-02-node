import { GetMetricsUseCase } from '../get-metrics'
import { KnexMealsRepository } from '@/repositories/knex/knex-meals-repository'

export function makeGetMetricsUseCase() {
  const mealsRepository = new KnexMealsRepository()
  const useCase = new GetMetricsUseCase(mealsRepository)

  return useCase
}
