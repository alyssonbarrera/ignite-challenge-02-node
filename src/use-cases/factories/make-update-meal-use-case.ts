import { UpdateMealUseCase } from '../update-meal'
import { KnexMealsRepository } from '@/repositories/knex/knex-meals-repository'

export function makeUpdateMealUseCase() {
  const mealsRepository = new KnexMealsRepository()
  const useCase = new UpdateMealUseCase(mealsRepository)

  return useCase
}
