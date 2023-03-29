import { DeleteMealUseCase } from '../delete-meal'
import { KnexMealsRepository } from '@/repositories/knex/knex-meals-repository'

export function makeDeleteMealUseCase() {
  const mealsRepository = new KnexMealsRepository()
  const useCase = new DeleteMealUseCase(mealsRepository)

  return useCase
}
